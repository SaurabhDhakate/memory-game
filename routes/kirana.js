const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const noop = () => { };

const DB_CRED = {
    host: process.env.DB_HOST || 'remotemysql.com',
    password: process.env.DB_PASS || 'pRGiA6vdVO',
    user: process.env.DB_USER || 'iFOyzVyv69',
    database: process.env.DB_NAME || 'iFOyzVyv69'
}

router.get('/store', (req, res) => {
    let db = mysql.createConnection(DB_CRED)
    db.connect(noop)
    db.on('error', noop)
    db.query('select * from shops;', (e, d) => {
        e ? noop : res.json(d)
    })
    db.end(noop)
})

router.get('/items/:id', (req, res) => {
    let db = mysql.createConnection(DB_CRED)
    db.connect(noop)
    db.on('error', noop)
    db.query(`select * from items where shop_id = ${req.params.id};`, (e, d) => {
        e ? noop : res.json(d)
    })
    db.end(noop)
})

module.exports = router;