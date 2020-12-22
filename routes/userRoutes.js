const express = require('express');
const mysql = require('mysql')
const router = express.Router();

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

db.on('error', err => console.log(err))

function query(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}
router.get('/user/:name', (req, res) => {
    query(`SELECT score FROM users WHERE name = '${req.params.name}';`)
        .then(data => {
            if (data.length == 0) {
                query(`INSERT INTO users VALUES ('${req.params.name}',NULL)`)
                    .then(() => res.json({ score: null }))
            }
            else {
                res.json({ score: data[0].score })
            }
        }).catch(console.log)
})

router.get('/user/update', (req, res) => {
    query(`UPDATE users SET score = '${req.query.score}' WHERE name='${req.query.name}'`).catch(console.log)
})

module.exports = router;