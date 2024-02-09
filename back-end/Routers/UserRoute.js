const express = require("express");

const userRouter = express.Router();
const {login, signIn, getUser, updateProfile} = require('../controllers/UserController')


// get

// post
userRouter.route('/login').post(login);
userRouter.route('/SignIn').post(signIn);
userRouter.route('/getUser').post(getUser);

// put
userRouter.route('/updateProfile').put(updateProfile);


module.exports = userRouter;