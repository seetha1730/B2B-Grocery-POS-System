const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const generator = require('generate-password');
const {
    isLoggedIn,
    isAdmin,
    isLoggedOut,
} = require("../middleware/route-guard");
const mailjet = require("node-mailjet").apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
);

router.get("/forgot-password", isLoggedOut, (req, res, next) => {
    res.render("auth/forgot-password", { root: "views", layout: false });
});

const contactList = function () {
    return mailjet.get("contact").request({}, { Limit: 20 });
};

sendMail = function (mail,password) {
    return mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Name: process.env.NAME,
                    Email: process.env.EMAIL,
                },
                To: [
                    {
                        Email: mail,
                        Name: "Admin",
                    },
                ],
                Subject: "Your password reset",
                TextPart:
                    `Here is your Temp password: ${password}`,
            },
        ],
    });
};

router.post("/forgot-password", isLoggedOut, (req, res, next) => {
    const { email } = req.body;
    const findUser = email ? User.findOne({ email }) : User.findOne({ username });

    findUser
        .then((user) => {
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "Email or username not registered.",
                    layout: false,
                });
                return;
            }

            const newPassword = generator.generate({
                length: 10,
                numbers: true
            });

            bcryptjs.genSalt(saltRounds)
                .then((salt) => bcryptjs.hash(newPassword, salt))
                .then((hashedPassword) => {
                    // findOneAndUpdate to update the user's password
                    return User.findOneAndUpdate(
                        { _id: user._id },
                        { passwordHash: hashedPassword },
                        { new: true } // Return the updated document
                    );
                })
                .then(() => {
                
                    return sendMail(email, newPassword);
                })
                .then(() => {
                    res.render("auth/login", {
                        layout: false,
                        notification: 'Please check your email for the reset password.'
                    });
                })
                .catch((error) => {
                    console.error('Error in forgot-password route:', error);
                    next(error);
                });
        })
        .catch((error) => {
            console.error('Error in forgot-password route:', error);
            next(error);
        });
});
module.exports = router;
