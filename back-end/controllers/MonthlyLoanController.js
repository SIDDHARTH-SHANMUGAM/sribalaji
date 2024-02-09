const Message = require('../models/MessageModel');
const MonthlyLoan = require('../models/MonthlyLoanModel')

const addLoan = async(req, res)=>{
  try{
    const { billNo, loanNo, UserId, guarantorId, amount}= req.body;
    const dues= {};
    const currentDate = new Date()
    for (let i = 1; i <= 5; i++) {
      const dueDate = new Date(currentDate);
      dueDate.setMonth(currentDate.getMonth() + i);

      dues[`month${i}`] = {
        monthNo:i,
        date: dueDate,
        amount: amount / 5,
        isPaid: false,
        billNo: 0,
        isHasOverDue: false,
        overDueAmount: 0,
        paidDate: currentDate,
      };
    }
    const str = new Date().getDate()+1;
    const str2 = new Date().getMonth()+1;
    const str3 = new Date().getFullYear();
    
    const today = new Date(`${str3}-${str2}-${str}`);
    const data =new MonthlyLoan({
      date: today,
      billNo: billNo,
      loanNo: loanNo,
      UserId : UserId,
      guarantorId: guarantorId,
      loanAmount: amount,
      dues: dues,
      pendingAmount: amount
    })
    data.save().then(()=> {res.json({message:'loanAdded'})})
    .catch((e)=> {res.json({message: 'errorOccuredInLoanInserting'}); console.log(e)})
    
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
}

const getAllLoans = async (req, res)=> {
  const {message, UserId} = req.body;
    try{
      let loans
      if(message==='all')
      {
        loans =await MonthlyLoan.find({})
      }
      else if(message==='getAsBorrower')
      {
        loans =await MonthlyLoan.find({UserId: UserId})
      }
      else if(message==='getAsGaurantor')
      {
        loans =await MonthlyLoan.find({guarantorId: UserId})
      }

      if(loans)
      {
        res.json({message:'got',loans:loans})
      }
      else
        res.json({message: 'empty'})
    }
    catch(e)
    {
      res.json({message:'Network error'})
    }
}

const getLoan = async (req, res) =>{
  try{
    const {message, loanNo} = req.body;
    const loan = await MonthlyLoan.findOne({loanNo: loanNo})
    if(loan)
    {
      res.json({message: 'got', loan: loan})
    }
    else  
      res.json({message: 'not available'})
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
}

const getThisWeekLoan = async (req, res) => {
    const str = new Date().getDate()+1;
    const str2 = new Date().getMonth()+1;
    const str3 = new Date().getFullYear();
    
  const today = new Date(`${str3}-${str2}-${str}`);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);
  try{
  const loans = await MonthlyLoan.find({
    $and: [
      {
        $or: [
          { "dues.month1.date": { $gte: today, $lt: endOfWeek } , "dues.month1.isPaid": false},
          { "dues.month2.date": { $gte: today, $lt: endOfWeek } , "dues.month2.isPaid": false},
          { "dues.month3.date": { $gte: today, $lt: endOfWeek } , "dues.month3.isPaid": false},
          { "dues.month4.date": { $gte: today, $lt: endOfWeek } , "dues.month4.isPaid": false},
          { "dues.month5.date": { $gte: today, $lt: endOfWeek } , "dues.month5.isPaid": false}
        ]
      },
      { "pendingAmount": { $gt: 0 } }
    ]
  });
  res.json({message:'got',loans:loans})
  }
  catch(e)
  {
    console.log(e)
    res.json({message: 'Network error'});
  }
}

const getTodayLoan = async (req, res) => {
  const str = new Date().getDate();
  const str2 = new Date().getMonth()+1;
  const str3 = new Date().getFullYear();
  const today = new Date(`${str3}-${str2}-${str}`);
  const endOfDay = new Date(today);
  endOfDay.setDate(today.getDate() + 2);
  try{
    const loans = await MonthlyLoan.find({
      $and: [
        {
          $or: [
            { "dues.month1.date": { $gte: today, $lt: endOfDay } , "dues.month1.isPaid": false},
            { "dues.month2.date": { $gte: today, $lt: endOfDay } , "dues.month2.isPaid": false},
            { "dues.month3.date": { $gte: today, $lt: endOfDay } , "dues.month3.isPaid": false},
            { "dues.month4.date": { $gte: today, $lt: endOfDay } , "dues.month4.isPaid": false},
            { "dues.month5.date": { $gte: today, $lt: endOfDay } , "dues.month5.isPaid": false}
          ]
        },
        { "pendingAmount": { $gt: 0 } }
      ]
    });
  res.json({message:'got',loans:loans})
  }
  catch(e)
  {
    console.log(e)
    res.json({message: 'Network error'});
  }
}

const makeLoan = async (req, res) => {
  const { loanId, paidDues } = req.body;

  try {
    const loan = await MonthlyLoan.findOne({loanNo: loanId});
    if (loan) {
      let c=0;
      for (const paidDue of paidDues) {
        loan.dues[`month${paidDue.monthNo}`].isPaid = true;
        loan.dues[`month${paidDue.monthNo}`].amount = 0; 
        loan.dues[`month${paidDue.monthNo}`].paidDate = new Date();
        c++;
      }
      loan.pendingAmount = (loan.loanAmount/5)*(5-c);

      await loan.save();

      res.json({ success: true, message: 'done', loan: loan });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ success: false, message: 'Payment processing error' });
    }
}

var cron = require('node-cron');

cron.schedule('45 0 * * *', async() => {
  try{
      let loans = await MonthlyLoan.find({})
      if(loans)
      {
        for (const loan of loans) {
          for (const month in loan.dues) {
            if (loan.dues[month].date < new Date() && !loan.dues[month].isPaid) 
            {
              const dueAmount = ((loan.dues[month].amount * 1) / 100)* Math.round((new Date()-loan.dues[month].date) / (1000 * 60 * 60 * 24));
              loan.dues[month].isHasOverDue = true;
              loan.dues[month].overDueAmount = dueAmount;
            }
          }
          try {
              await loan.save();
            } catch (error) {
              console.error(`Error saving loan: ${loan._id}`, error);
            }
        }
      }
    }
    catch(e)
    {
      console.log(e);
    }
  try{
  const str = new Date().getDate();
  const str2 = new Date().getMonth()+1;
  const str3 = new Date().getFullYear();
  const today = new Date(`${str3}-${str2}-${str}`);
  const endOfDay = new Date(today);
  endOfDay.setDate(today.getDate() + 2);
    const loans = await MonthlyLoan.find({
      $and: [
        {
          $or: [
            { "dues.month1.date": { $gte: today, $lt: endOfDay } , "dues.month1.isPaid": false},
            { "dues.month2.date": { $gte: today, $lt: endOfDay } , "dues.month2.isPaid": false},
            { "dues.month3.date": { $gte: today, $lt: endOfDay } , "dues.month3.isPaid": false},
            { "dues.month4.date": { $gte: today, $lt: endOfDay } , "dues.month4.isPaid": false},
            { "dues.month5.date": { $gte: today, $lt: endOfDay } , "dues.month5.isPaid": false}
          ]
        },
        { "pendingAmount": { $gt: 0 } }
      ]
    });
    for(const loan of loans)
    {
      const data =new Message({ UserId: loan.UserId, message: "due date is going to expire within today please make sure to pay the due correctly", isSeen: false })
      data.save().then(()=> {console.log({message:'MessageAdded'})})
      .catch((e)=> {console.log({message: 'errorOccuredInMessageInserting'},e)})
    }
  
  }
  catch(e)
  {
    console.log(e)
  }
  try{
  const str = new Date().getDate()+7;
  const str2 = new Date().getMonth()+1;
  const str3 = new Date().getFullYear();
  const today = new Date(`${str3}-${str2}-${str}`);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 2);
  console.log(today, endOfWeek)
  const loans = await MonthlyLoan.find({
    $and: [
      {
        $or: [
          { "dues.month1.date": { $gte: today, $lt: endOfWeek }, "dues.month1.isPaid": false },
          { "dues.month2.date": { $gte: today, $lt: endOfWeek }, "dues.month2.isPaid": false },
          { "dues.month3.date": { $gte: today, $lt: endOfWeek }, "dues.month3.isPaid": false },
          { "dues.month4.date": { $gte: today, $lt: endOfWeek }, "dues.month4.isPaid": false },
          { "dues.month5.date": { $gte: today, $lt: endOfWeek }, "dues.month5.isPaid": false }
        ]
      },
      { "pendingAmount": { $gt: 0 } }
    ]
  });
  for(const loan of loans)
    {
      const data =new Message({ UserId: loan.UserId, message: "due date is going to expire within 7 days please make sure to pay the due correctly", isSeen: false })
      data.save().then(()=> {console.log({message:'MessageAdded'})})
      .catch((e)=> {console.log({message: 'errorOccuredInMessageInserting'},e)})
    }
  }
  catch(e)
  {
    console.log(e)
    res.json({message: 'Network error'});
  }
  try{
  const str = new Date().getDate()+7;
  const str2 = new Date().getMonth()+1;
  const str3 = new Date().getFullYear();
  const today = new Date(`${str3}-${str2}-${str}`);
  const loans = await MonthlyLoan.find({
  $and: [
    {
      $or: [
        { "dues.month1.date": { $lte: today }, "dues.month1.isPaid": false },
        { "dues.month2.date": { $lte: today }, "dues.month2.isPaid": false },
        { "dues.month3.date": { $lte: today }, "dues.month3.isPaid": false },
        { "dues.month4.date": { $lte: today }, "dues.month4.isPaid": false },
        { "dues.month5.date": { $lte: today }, "dues.month5.isPaid": false }
      ]
    },
    { "pendingAmount": { $gt: 0 } }
  ]
});
  for(const loan of loans)
    {
      const data =new Message({ UserId: loan.UserId, message: "due date has been expired please make sure to pay the due correctly else OverDue may increases", isSeen: false })
      data.save().then(()=> {console.log({message:'MessageAdded'})})
      .catch((e)=> {console.log({message: 'errorOccuredInMessageInserting'},e)})
    }
  }
  catch(e)
  {
    console.log(e)
    res.json({message: 'Network error'});
  }
});

module.exports = {addLoan , getAllLoans, getLoan, getThisWeekLoan, getTodayLoan, makeLoan};