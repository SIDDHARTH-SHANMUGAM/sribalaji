const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            unique: true
        },
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        mobile:{
            type: Number,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        imageUrl:{
            type: String,
            default: 'Images/default-profile.jpg',
        }
    },
    {
        timestamps: true
    }
)


const User = mongoose.model("users", UserSchema);

module.exports = User