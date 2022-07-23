const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing Middleware
// Parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

// Static Files
// public folder contains all the static files
app.use(express.static('public'));

// Templating Engine
// Using express-handlebars over ejs 
app.engine('.hbs',exphbs.engine({extname: '.hbs'}));
app.set('view engine','hbs'); // it uses Views/Layouts folder


// Creating connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});

// COnnect to DB
pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('Connecting to the database...');
    console.log('Connected as ID ' + connection.threadId);

});

// Routes
const routes = require('./server/routes/user');
app.use('/',routes);

app.listen(port, () => console.log('Listening on port ' + port));