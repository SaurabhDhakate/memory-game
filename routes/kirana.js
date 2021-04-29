const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const noop = _ => { };

const DB_CRED = {
    host: process.env.DB_HOST || 'remotemysql.com',
    password: process.env.DB_PASS || 'pRGiA6vdVO',
    user: process.env.DB_USER || 'iFOyzVyv69',
    database: process.env.DB_NAME || 'iFOyzVyv69'
}

const query = (dbquery) => {
    let db = mysql.createConnection(DB_CRED)
    db.connect(noop)
    db.on('error', noop)
    return new Promise((resolve, reject) => {
        db.query(dbquery, (error, data) => {
            if (error) {
                reject(error)
                db.end(noop)
            } else {
                resolve(data)
                db.end(noop)
            }
        })
    })
}

router.get('/store', (req, res) => {
    let dbquery = 'select * from shops;'
    query(dbquery).then(data => res.json(data)).catch(noop)
})

router.get('/items/:id', (req, res) => {
    let dbquery = `select * from items where shop_id = ${req.params.id};`
    query(dbquery).then(data => res.json(data)).catch(noop)
})

router.post('/store', (req, res) => {
    let dbquery = `INSERT INTO shops (name, phone, timing, address, image) VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.timing}', '${req.body.address}', '${req.body.image}')`
    query(dbquery).then(data => res.json(data)).catch(noop)
})

router.post('/item', (req, res) => {
    let dbquery = `INSERT INTO items (shop_id, name, price, image) VALUES ('${Number(req.body.shopId)}', '${req.body.name}', '${req.body.price}', '${req.body.image}')`
    query(dbquery).then(data => res.json(data)).catch(noop)
})

router.get('/removeshop/:id', (req, res) => {
    let dbquery1 = `DELETE FROM shops WHERE id = ${req.params.id};`
    let dbquery2 = `DELETE FROM items WHERE shop_id = ${req.params.id};`
    query(dbquery1).then(_ => query(dbquery2)).then(_ => res.json(_)).catch(_ =>res.json({}))
})

router.get('/removeitem/:id', (req, res) => {
    let dbquery = `DELETE FROM items WHERE id = ${req.params.id};`
    query(dbquery).then(data => res.json(data)).catch(noop)
})

module.exports = router;