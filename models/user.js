const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    wallet: {
        type: String,
        unique: true,
    },
    balance: {
        type: String,
        default: null
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model("user", userSchema);