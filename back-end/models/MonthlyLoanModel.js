const mongoose = require("mongoose")

const monthSchema = new mongoose.Schema({
  monthNo: {
    type: Number,
    required:true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  billNo :{
    type: Number,
    required : true,
  },
  isHasOverDue :{
    type: Boolean,
    required : true,
  },
  overDueAmount :{
    type: Number,
    required : true,
  },
  paidDate: {
    type: Date,
    required: true,
  }
});

const MonthlyLoanSchema = new mongoose.Schema(
    {
        date: {
          type : Date,
          required: true,
        },
        billNo: {
            type: Number,
            required: true
        },
        loanNo:{
            type: Number,
            required: true
        },
        UserId:{
            type: String,
            required: true
        },
        guarantorId:{
          type: String,
          required: true
        },
        loanAmount:{
            type: Number,
            required: true
        },
        dues: {
            month1: monthSchema,
            month2: monthSchema,
            month3: monthSchema,
            month4: monthSchema,
            month5: monthSchema,
        },
        pendingAmount: {
            type : Number,
            required: true
        } 
    }
)


const MonthlyLoan = mongoose.model("loan", MonthlyLoanSchema);

module.exports = MonthlyLoan