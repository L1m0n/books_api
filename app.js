const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Book = require('./models/bookModel'),
    CONFIG = require('./config'),
    bookRouter = require('./routes/bookRoutes')(Book);

const db = mongoose.connect(CONFIG.db, {useMongoClient: true});
const app = express();
const port  = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
  res.send('Welcome to API');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});
