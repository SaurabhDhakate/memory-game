const express = require('express');
const mysql = require('mysql')
const router = express.Router();

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

router.get('/test', (req, res) => {
    res.send("test")
})

router.get('/user/:name', (req, res) => {
    db.query(`SELECT score FROM users WHERE name = '${req.params.name}';`, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (data.length == 0) {
                db.query(`INSERT INTO users VALUES ('${req.params.name}',NULL)`,(err,data)=>{
                    if (err) {
                        console.log(err)
                    }
                    else{
                        res.json({score:null})
                    } 
                })
            }else{
                res.json({score:data[0].score})
            }
        }
    })

})

router.get('/update',(req,res)=>{
    db.query(`UPDATE users SET score = '${req.query.score}' WHERE name='${req.query.name}'`,err=>err?console.log(err):true)
})



module.exports = router;