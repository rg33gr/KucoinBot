var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const axios = require('axios')
const Coin = require('./coin.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const url = "https://api.kucoin.com/api/v1/symbols"
const usdtPairs = [];
const map = new Map();

const getData = async (url) => {

  try {
    const response = await axios.get(url)
    const data = response.data.data // Array of all sybomls
    
    for (let coin in data){
      if (data[coin].symbol.includes("USDT")){
        //usdtPairs.push(data[coin])
        let curr = new Coin(data[coin]);
        map.set(curr.symbol.split('-')[0], coin);
      }
    }

    //console.log("Number of coins is: " + usdtPairs.length)


    //console.log("THE FIRST COIN IS: " + firstCoin.symbol);
    console.log(map.keys());
    
  } catch (error) {
    console.log(error)
  }
}

const initializeCoins = () => {
  //loop through usdtPairs and initialize coins base on symbol
  
}



getData(url);


module.exports = app;
