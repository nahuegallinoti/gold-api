var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/user');
const jwt = require("jsonwebtoken");


// create user with JWT
router.post('/', auth, async function (req, res) {
    try {

        const {
            wallet,
            balance
        } = req.body;

        if (!(wallet)) {
            res.status(400).send("Wallet Id is required");
        }

        const oldUser = await User.findOne({
            wallet
        });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        // Create user in our database
        const user = await User.create({
            wallet,
            balance
        });

        const token = jwt.sign({
                user_id: user._id,
                wallet
            },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );

        user.token = token;

        console.log(`Wallet Id ${user.wallet} Created Successfully by ${req.user.wallet} with balance ${req.user.balance}`);
        res.status(201).json(user);

    } catch (error) {
        res.status(500).send(error);
    }

});

// update user balance
router.put('/balance', async function (req, res) {
    try {

        const {
            wallet,
            balance
        } = req.body;

        if (!(wallet)) {
            res.status(400).send("Wallet is required");
        }

        const user = await User.findOne({
            wallet
        });

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        user.balance = balance;

        await user.save();

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error);
    }

});

// get user balance
router.get('/balance/:wallet', async function (req, res) {
    try {

        const {
            wallet
        } = req.params;

        if (!(wallet)) {
            res.status(400).send("Wallet is required");
        }

        const user = await User.findOne({
            wallet
        });

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;