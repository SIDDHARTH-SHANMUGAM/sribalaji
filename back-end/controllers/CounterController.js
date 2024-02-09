const Counter = require('../models/CounterModel')

const getCounter = async(req, res) =>{
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
}

const increment =async(req, res) =>{
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
}

module.exports = {getCounter, increment};