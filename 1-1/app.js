const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('node:fs/promises')
const UserRouter = require("./routes/user");
const productModel = require('./models/product.js')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/db1')
  .then(() => console.log('db connected!'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/user", UserRouter);

//make database with json file
fs.readFile('./dbs/products-data.json','utf-8', (err,data) => data)
  .then(productsJson => {
    const db = mongoose.connection;

    db.once('open', async () => {
      const collections = await db.db.listCollections().toArray();

      if (collections.some(collection => collection.name === 'products')) {
        return
      }

      const data = JSON.parse(productsJson)

      data.map(async (product) => {
        let savedProduct = new productModel(product)

        await savedProduct.save()
      })
    })
  })

  
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

module.exports = app