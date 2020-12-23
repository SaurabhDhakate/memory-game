require('dotenv').config()

const sgMail = require('@sendgrid/mail')

function sendMail(email, score) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: `${email}`, // Change to your recipient
        from: 'Saurabh <saurabh.dhakate@mountblue.tech>', // Change to your verified sender
        subject: 'New Best Score',
        text: `Hooray ! Your new Best Score ${score}`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
module.exports = sendMail;