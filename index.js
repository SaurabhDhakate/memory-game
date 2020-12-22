const express = require('express');
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT

dotenv.config()

app.use(express.static('public'))
app.use('/api', require('./routes/userRoutes'))
app.listen(PORT, () => console.log("Listenng on Port : ", PORT))