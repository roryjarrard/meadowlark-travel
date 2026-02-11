const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();

app.use(express.static(path.join(__dirname, '..', '/public')));

const viewsPath = path.join(__dirname, 'views');

// configure Handlebars view engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(viewsPath, 'layouts'),
    partialsDir: path.join(viewsPath, 'partials'),
}));
app.set('view engine', 'hbs');
app.set('views', viewsPath);

const port = process.env.PORT || 3000;

app.get('/', handlers.home);

app.get('/about', handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

app.listen(port, () => console.log(`Meadowlark app listening on port ${port}...`));

