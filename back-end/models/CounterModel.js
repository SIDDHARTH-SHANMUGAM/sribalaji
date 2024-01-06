const mongoose = require("mongoose")

const CounterScema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        seq : {
            type: Number,
        }
    }
)
const Counter = mongoose.model("counter", CounterScema);

module.exports = Counter