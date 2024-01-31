const express = require('express')
const connectDb = require('./config/dbConnect');
require('dotenv').config()

const cors = require('cors')
const User = require('./models/UserModel')
const Counter = require('./models/CounterModel')
const MonthlyLoan = require('./models/MonthlyLoanModel')
const multer = require('multer')

connectDb();
const app = express()
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT, ()=> {
    console.log('server is running')
})

// login
app.post("/", async(req, res)=> {
  const{mobile, password}= req.body;
  try{
    const check = await User.findOne({mobile: mobile})
    if(check)
    {
      const user= await User.findOne({mobile: mobile, password: password})
      if(user)
      {
        res.json({message : "Exist" , user: user});
      }
      else
        res.json({message: "Password is Wrong" });
    }
    else
    {
      res.json({ message :"not Exist" });
    }
  }
  catch(e){
    res.json({message : "Network Error" });
  }
})

//POST Signup
app.post("/signup", async(req, res)=> {
  const {firstName, lastName, mobile, address, password}= req.body;
  try{
    let check = await User.findOne({mobile: mobile})
    if(check)
    {
      res.json({message: "mobile is already Exist"});
    }
    else
    {
      let seqId;
      const cd = await Counter.findOneAndUpdate(
        { id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true }
      ).exec();
      if (cd == null) {
          const newVal = new Counter({ id: 'userId', seq: 201600011 });
          await newVal.save();
          seqId = 201600011;
      }
      else {
          seqId = cd.seq;
      }
      const data ={
        UserId : seqId,
        firstName : firstName,
        lastName : lastName,
        mobile : mobile,
        address: address,
        password: password,
        isAdmin: 'false'
      }
      await User.insertMany([data]);

      const user = await User.findOne({ UserId: seqId}).exec();
      res.json({message: "signedIn", user: user})
    }
  }
  catch(e){
    console.log(e);
  }
})


app.post('/getId', async(req, res) =>{
  try{
    const {reqId}= req.body;
    const bill = await Counter.findOne({id : reqId})
    if(bill)
      res.json(bill.seq)
  }
  catch(e)
  {
    console.log(e);
  }
})

app.post('/confirmIncremented', async(req, res) =>{
  try{
    const {reqId}= req.body;
    await Counter.findOneAndUpdate(
        { id: reqId },
        { $inc: { seq: 1 } },
        { new: true }
      ).exec()
      res.json({message: 'increamented'})
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
})

app.post('/getUser', async(req, res) =>{
    const {message, value}= req.body;
  try{
    if(message==='id')
    {
      const user = await User.findOne({UserId: value});
      if(user){
        res.json({message:'userfound', user: user})
      }
      else
        res.json({message:'usernotfound'})
    }
    else if(message=='mobile')
    {
      const user = await User.findOne({mobile: value});
      if(user)
        res.json({message:'userfound', user: user})
      else
        res.json({message:'usernotfound'})

    }
  }
  catch(e)
  {
    console.log(e)
  }
})

app.post('/addLoan', async(req, res)=>{
  try{
    const { billNo, loanNo, userId, guarantorId, amount}= req.body;
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

    const data =new MonthlyLoan({
      date: new Date(),
      billNo: billNo,
      loanNo: loanNo,
      UserId : userId,
      guarantorId: guarantorId,
      loanAmount: amount,
      dues: dues,
      pendingAmount: amount
    })
    data.save().then(()=> {res.json({message:'loanAdded'})})
    .catch(()=> {res.json({message: 'errorOccuredInLoanInserting'})})
    
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
})

app.post('/getAllLoans', async (req, res)=> {
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
        res.json({message:'got',loans:loans})
      }
      else
        res.json({message: 'empty'})
    }
    catch(e)
    {
      res.json({message:'Network error'})
    }
})

app.post('/getLoan', async (req, res) =>{
  try{
    const {message, loanNo} = req.body;
    if(message==='monthly')
    {
      const loan = await MonthlyLoan.findOne({loanNo: loanNo})
      if(loan)
      {
        for (const month in loan.dues) {
          if (!loan.dues[month].isPaid&&loan.dues[month].date < new Date() && !loan.dues[month].isPaid) 
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
        res.json({message: 'got', loan: loan})
      }
      else  
        res.json({message: 'not available'})
    }
  }
  catch(e)
  {
    res.json({message: 'Network error'})
  }
})
app.get('/getThisWeekLoan', async (req, res) => {
  try{
    

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfWeek = new Date();
  endOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setDate(today.getDate() + 7);
  const loans = await MonthlyLoan.find({
    $and: [
      {
        $or: [
          { "dues.month1.date": { $gte: today, $lte: endOfWeek } },
          { "dues.month2.date": { $gte: today, $lte: endOfWeek } },
          { "dues.month3.date": { $gte: today, $lte: endOfWeek } },
          { "dues.month4.date": { $gte: today, $lte: endOfWeek } },
          { "dues.month5.date": { $gte: today, $lte: endOfWeek } }
        ]
      },
      { "pendingAmount": { $gt: 0 } }
    ]
  });
  res.json({message:'got',loans:loans})
  }
  catch(e)
  {
    res.json({message: 'Netwprk error'});
  }
})
app.get('/getTodayLoan', async (req, res) => {
  try{
    const today = new Date();
    console.log(today)
    console.log(today)
    const endOfDay = new Date();
    endOfDay.setDate(today.getDate()+1);
    console.log(today)
    console.log(endOfDay)
    const loans = await MonthlyLoan.find({
      $and: [
        {
          $or: [
            { "dues.month1.date": { $gte: today, $lte: endOfDay } },
            { "dues.month2.date": { $gte: today, $lte: endOfDay } },
            { "dues.month3.date": { $gte: today, $lte: endOfDay } },
            { "dues.month4.date": { $gte: today, $lte: endOfDay } },
            { "dues.month5.date": { $gte: today, $lte: endOfDay } }
          ]
        },
        { "pendingAmount": { $gt: 0 } }
      ]
    });
    


console.log("Today's Loans:", loans);

  res.json({message:'got',loans:loans})
  }
  catch(e)
  {
    res.json({message: 'Netwprk error'});
  }
})

app.post('/handleBill', async (req, res) => {
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
});


const Storage = multer.diskStorage({
  destination: `../front-end/public/Images`,
  filename: (req, file, cb) => {
    cb(null , file.originalname);
  }
})

const upload = multer(
  {
    storage : Storage
  }
).single('photo')

app.post('/uploadImage', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ message: 'Image upload failed' });
    }
    try {
      const userId = req.body.UserId;

      if (!userId) {
        return res.json({ error: 'User ID is required' });
      }

      const imageUrl = `/Images/${req.file.filename}`;
      const user = await User.findOneAndUpdate(
        { UserId: userId },
        { imageUrl: imageUrl },
        { new: true }
      );
      res.json({ message: 'done' , user: user });
    } catch (error) {
      console.log('Error:', error); 
      res.json({ message: 'Server error' });
    }
  });
});

app.post('/updateUser',async (req, res) =>{
    try {
      const {UserId, firstName, lastName, address, mobile} = req.body ;

      console.log(UserId, firstName, lastName, address, mobile )
      if (!UserId) {
        return res.json({ error: 'User ID is required' });
      }

      const user = await User.findOneAndUpdate(
        { UserId: UserId },
        { 
          firstName: firstName, 
          lastName: lastName , 
          address: address , 
          mobile: mobile 
        },
        { new: true }
      );
      res.json({ message: 'updated' , user: user });
    } catch (error) {
      console.log('Error:', error); 
      res.json({ message: 'Server error' });
    }
})

