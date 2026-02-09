const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

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

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => res.render('about'));

// custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// custom 500 page
// app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.status(500);
//     res.render('500');
// });

app.listen(port, () => console.log(`Meadowlark app listening on port ${port}...`));