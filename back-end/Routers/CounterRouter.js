const express = require("express");

const counterRouter = express.Router();
const {getCounter, increment} = require('../controllers/CounterController')


// get

// post
counterRouter.route('/getCounter').post(getCounter);
counterRouter.route('/increament').post(increment);
// put

module.exports = counterRouter;