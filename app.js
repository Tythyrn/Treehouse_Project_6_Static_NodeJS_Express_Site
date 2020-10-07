const express = require('express');

//sets up the express app
const app = express();

//Setting up the static server
app.use('/static', express.static('public'));

//setting the view engine to use pug templates
app.set('view engine', 'pug');

//setting up the connection to the routes module and loading it into express
const routes = require('./routes');
app.use(routes);

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});