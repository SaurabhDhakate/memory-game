const express = require('express');
const mysql = require('mysql')
const router = express.Router();

let db = mysql.createConnection({
    host: process.env.DB_HOST ||'remotemysql.com',
    password: process.env.DB_PASS||'pRGiA6vdVO',
    user: process.env.DB_USER||'iFOyzVyv69',
    database: process.env.DB_NAME||'iFOyzVyv69'
})

db.on('error', err => console.log(err))

function query(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}
router.get('/store', (req, res) => {
    query(`SELECT * FROM shops;`)
        .then(data => {
            res.json(data)
        }).catch(console.log)
})


module.exports = router;