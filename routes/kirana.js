const express = require('express');
const mysql = require('mysql');
const Axios = require('axios')
const router = express.Router();
const noop = () => { };

const IMG_API_KEY = '28c9b266952ca9d1a09972ed08c96fb9';

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

router.post('/store', (req, res) => {
    let db = mysql.createConnection(DB_CRED)
    db.connect(noop)
    db.on('error', noop)
    db.query(`INSERT INTO shops (name, phone, timing, address, image) VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.timing}', '${req.body.address}', '${req.body.image}')`, (e, d) => {
        e ? console.log(e) : res.json(d)
    })
    db.end(noop)
})

router.post('/item', (req, res) => {
    console.log(req.body)
    let db = mysql.createConnection(DB_CRED)
    db.connect(noop)
    db.on('error', noop)
    db.query(`INSERT INTO items (shop_id, name, price, image) VALUES ('${Number(req.body.shopId)}', '${req.body.name}', '${req.body.price}', '${req.body.image}')`, (e, d) => {
        e ? console.log(e) : res.json(d)
    })
    db.end(noop)
})

module.exports = router;