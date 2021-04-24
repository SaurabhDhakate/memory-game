const express = require('express');
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT||8000

dotenv.config()

app.use(express.static('public'))
app.use('/api', require('./routes/userRoutes'))
app.use('/v1/api', require('./routes/kirana'))
app.listen(PORT, () => console.log("Listenng on Port : ", PORT))