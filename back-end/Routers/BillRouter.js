const express = require("express");

const billRouter = express.Router();
const {addBill, getBill} = require('../controllers/BillController')

// get
billRouter.route('/getBill').get(getBill);

// post
billRouter.route('/addBill').post(addBill);
// put

module.exports = billRouter;