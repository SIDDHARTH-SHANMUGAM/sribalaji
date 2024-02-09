const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        isSeen: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)


const Message = mongoose.model("message", MessageSchema);

module.exports = Message