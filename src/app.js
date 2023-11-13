const express = require ('express');
const app = express();
const morgan = require('morgan');

//Settings
app.set('port', process.env.PORT || 9000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
//routes
app.use('/api', require('./routes/routes'));


export default app;