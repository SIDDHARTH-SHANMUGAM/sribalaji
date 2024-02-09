const User = require('../models/UserModel');
const Counter = require('../models/CounterModel');

const login= async(req, res)=>{
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
}

const signIn = async(req, res)=> {
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
}

const getUser = async(req, res) =>{
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
}

const updateProfile = async (req, res) =>{
  console.log('hi')
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
}


module.exports= {login, signIn, getUser, updateProfile};