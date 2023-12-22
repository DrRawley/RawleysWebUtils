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

app.post('/contactform', async (req, res) => {
    const { contact } = req.body;
    const message = `You've got a new contact!\nName: ${contact.name}\nemail: ${contact.email}\nphone: ${contact.phone}\nMessage: ${contact.message}`;
    console.log(message);

    const messageId = await sendMail(message);

    res.redirect('https://drrawley.com');

});

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        // `user` and `pass` values from brevo.com
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function sendMail(contactMessage) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"DrRawley Contact Form" <no-reply@drrawley.com>', // sender address
        to: "rawley.greene@gmail.com", // list of receivers
        subject: "New Contact", // Subject line
        text: contactMessage, // plain text body
        //html: "<b>Hello world?</b>", // html body
    });

    return (info.messageId);
}
