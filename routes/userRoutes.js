const express = require('express');
const joi = require('joi')
const mysql = require('mysql')
const router = express.Router();

let db_config = {
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
}

function query(db, query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}
router.get('/user', (req, res) => {
    let nameSchema = joi.object({
        name: joi.string().regex(/^[a-zA-Z ]{2,30}$/).required()
    })
    let toValidate = { name: req.query.name }
    let result = nameSchema.validate(toValidate)
    if (result.error) {
        res.json({ error: result.error })
    }
    else {
        let db = mysql.createConnection(db_config)
        db.on('error', err => console.log(err.message))
        query(db, `SELECT score FROM users WHERE name = '${req.query.name}';`)
            .then(data => {
                if (data.length == 0) {
                    query(db, `INSERT INTO users VALUES ('${req.query.name}',NULL)`)
                        .then(() => res.json({ score: null }))
                        .then(() => db.end())
                }
                else {
                    res.json({ score: data[0].score })
                    db.end()
                }
            }).catch(err => {
                db.end()
                console.log(err)
            })
    }
})

router.get('/score/update', (req, res) => {
    let db = mysql.createConnection(db_config)
    db.on('error', err => console.log(err.message))
    query(db, `UPDATE users SET score = '${req.query.score}' WHERE name='${req.query.name}'`)
        .then(() => res.json(req.query))
        .then(() => db.end())
        .catch(err => {
            db.end()
            console.log(err)
        })
})

router.get('/send-mail', (req, res) => {
    let score = req.query.score
    let user_email = req.query.email
    let emailSchema = joi.object({
        email: joi.string().email().required(),
        score:joi.number().required()
    })
    let toValidate = { email: user_email }
    let result = emailSchema.validate(toValidate)
    if (result.error) {
        res.json({ error: result.error })
    }
    else {
        let mailer = require('./mailer')
        mailer(user_email,score)
        res.json({status:"OK"})
    }
})

module.exports = router;