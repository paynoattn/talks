const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

const { generateRedirectPage } = require('./helpers/html');

app.get('/', (req, res) => {
  // TODO: add logic to not redirect when the auth token is present.
  const page = generateRedirectPage();
  res.send(page);
});

app.use('/public', express.static(__dirname + '/public'));

// auth router for setting and recieving jwt token
const { authRouter } = require('./auth');
app.use('/auth', authRouter);

// import the jwt secret router for showing how to use jwts with secrets
// const { jwtSecretRouter } = require('./jwt-secret');
// app.use('/auth/secret', jwtSecretRouter);

// import the jwt key router for showing how to use jwts signed by certs
// const { jwtKeyRouter } = require('./jwt-key');
// app.use('/auth/key', jwtKeyRouter);

const port = process.env.APP_PORT || 5000;

app.listen(port, err => {
  if (err) { console.error('error starting server:', err) }
  console.log('Server listening on port ' + port);
});
