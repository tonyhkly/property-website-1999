const path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use('/shared-files', express.static(path.resolve(__dirname, '../shared-files')));
app.use('/pages', express.static(path.resolve(__dirname, '../pages')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/homepage/index.html')));
app.get('/search-results', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/search-results/index.html')));
app.get('/property-details', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/property-details/index.html')));
app.get('/contact-agent', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/contact-agent/index.html')));
app.get('/searching', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/searching/index.html')));
app.get('/error', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/error/index.html')));
app.get('/404', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/404/index.html')));
app.get('/example', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/example-page/index.html')));
app.get('/property-details-popup', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/property-details/popup.html')));
app.get('/searching-redirect', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/searching-redirect/index.html')));

app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../pages/404/index.html')));

app.listen(port, () => {
    console.log('\x1b[32m', `Property Website 1999 app started on port ${port}! Go to http://localhost in your web browser to seen the page`);
    console.log('\x1b[35m', `\nTo stop the application when you aren't using it, click on the terminal and type 'ctrl + c'`)
});
