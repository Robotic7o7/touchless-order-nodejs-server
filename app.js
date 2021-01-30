var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv = require("dotenv");

dotenv.config();


//mongoose
var mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(
    "mongodb+srv://robotic707:helloworld@digitalwaiter.q60zj.mongodb.net/DigitalWaiter?retryWrites=true&w=majority",
    mongooseOptions
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("mongodb connection established");
});


var indexRouter = require('./routes/index');
var tableRouter = require('./routes/tables');
var itemRouter = require('./routes/menu_items');
var orderRouter = require('./routes/orders');
var paymentsRouter = require('./routes/payments');

var app = express();



app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tables', tableRouter);
app.use('/menu', itemRouter);
app.use('/order', orderRouter);
app.use('/payments', paymentsRouter);

module.exports = app;
