const express = require('express');
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())
app.use(express.static('kirana/app'))

app.use('/kirana',express.static('kirana/app'))
app.use('/api', require('./routes/userRoutes'))
app.use('/v1/api', require('./routes/kirana'))
app.listen(PORT, () => console.log("Listenng on Port : ", PORT))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(console.log);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});