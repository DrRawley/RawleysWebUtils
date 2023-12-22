if (process.env.NODE_ENV !== "production") { //For reading development .env keys
    require('dotenv').config();
}
//Express stuff
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const nodemailer = require("nodemailer");

// ********* Start Express Listening ************                                    
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});

app.get('/mailform', async (req, res) => {

    const messageId = await sendMail();

    res.send(`Sent: ${messageId}`);

});

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Nodemailer Test" <no-reply@drrawley.com>', // sender address
        to: "rawley.greene@gmail.com", // list of receivers
        subject: "Hello 3", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return (info.messageId);
}
