const express = require ('express');
const app = express();
const morgan = require('morgan');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//routes
app.use('/api', require('./routes/routes'));


export default app;