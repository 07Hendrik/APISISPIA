const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const personaRoutes = require('./routes/persona');

//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personaRoutes);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})
