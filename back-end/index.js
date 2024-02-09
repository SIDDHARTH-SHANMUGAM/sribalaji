const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, ()=> {
    console.log('server is running')
})

// db connection
const connectDb = require('./config/dbConnect');
connectDb();

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
const userRouter = require('./Routers/UserRoute')
const monthlyLoanRouter = require('./Routers/MonthlyLoanRoute')
const billRouter = require('./Routers/BillRouter')
const counterRouter = require('./Routers/CounterRouter');
const messageRouter = require('./Routers/MessageRouter');

app.use('/user', userRouter);
app.use('/monthlyLoan',monthlyLoanRouter);
app.use('/bill', billRouter)
app.use('/counter', counterRouter)
app.use('/msg', messageRouter)


// multer storage
const User = require('./models/UserModel')
const multer = require('multer');
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
    console.log('hi');
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