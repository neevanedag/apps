var cors = require('cors');
const server = require('./server');
const express = require('express');
const bodyParser = require('body-parser');

const eventspage = require('./routes/product.route'); // Imports routes for the products
const app = express();

app.use(cors({origin: 'http://localhost:8080'}));
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/Reactathon';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/eventpage', eventspage);
server.start(app);