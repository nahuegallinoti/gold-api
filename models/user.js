const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    wallet: {
        type: String,
        default: null
    },
    balance: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("user", userSchema);