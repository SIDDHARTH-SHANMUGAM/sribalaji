const express = require("express");

const loanRouter = express.Router();
const {addLoan, getAllLoans, getLoan, getThisWeekLoan, getTodayLoan, makeLoan} = require('../controllers/MonthlyLoanController')


// get
loanRouter.route('/getTodayLoan').get(getTodayLoan);
loanRouter.route('/getThisWeekLoan').get(getThisWeekLoan);

// post
loanRouter.route('/addLoan').post(addLoan);
loanRouter.route('/getAllLoans').post(getAllLoans);
loanRouter.route('/getLoan').post(getLoan);
loanRouter.route('/makeLoan').post(makeLoan);

// put

module.exports = loanRouter;