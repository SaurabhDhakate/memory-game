let api_key = '30b2775ce8c3dafe1bcd28d44547a3e6-b6190e87-5fdf0311';
let domain = 'sandboxaf8a2e86d20f4e339837015bc324f53e.mailgun.org';
let mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function sendMail(email, score) {
    let data = {
        from: 'Saurabh from -Memory Game <me@samples.mailgun.org>',
        to: `${email}`,
        subject: 'New Best Score',
        text: `Congrats ! You scored new best score ${score}`
    };
    mailgun.messages().send(data, (err, body) => err ? console.log(err) : console.log(body.message));
}
module.exports = sendMail;