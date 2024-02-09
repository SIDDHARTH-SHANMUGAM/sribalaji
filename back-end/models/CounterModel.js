const mongoose = require("mongoose")

const CounterSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        seq : {
            type: Number,
        }
    }
)
const Counter = mongoose.model("counter", CounterSchema);

module.exports = Counter