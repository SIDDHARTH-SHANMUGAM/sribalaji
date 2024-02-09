const mongoose = require("mongoose")

const BillSchema = new mongoose.Schema(
    {
        date: {
          type : Date,
          required: true,
        },
        billNo: {
            type: Number,
            required: true
        },
        UserId:{
            type: String,
            required: true
        },
        loanType: {
            type: String,
            required : true
        },
        loanNo:{
            type: Number,
            required: true
        },
        isPayment:{
            type: Boolean,
            required: true
        },
        receivedAmount:{
            type: Number,
            required: true
        },
        paidAmount:{
            type: Number,
            required: true,
        },
        paidDues:{
            type: String,
            required: true
        }
    }
)


const Bill = mongoose.model("bill", BillSchema);

module.exports = Bill