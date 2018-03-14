const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./route.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', router);

app.set('view engine', 'ejs');

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});
