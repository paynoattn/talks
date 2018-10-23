const bodyParser = require("body-parser");
const express = require('express');
const fs = require('fs');
const jwtKeyRouter = express.Router();

const { generateHome } = require('./helpers/html');

// you need to generate a private and public key
// ie through a site like http://travistidwell.com/jsencrypt/demo/
// NOTE: there are better ways to load and store (ie through hashicorp's vault)
// this is just a demo though.
const privateKey = fs.readFileSync(__dirname + '/secrets/private_key.key', 'utf8');
const publicKey = fs.readFileSync(__dirname + '/secrets/public_key.key', 'utf8');
const { UserHelper } = require('./helpers/user');
const userHelper = new UserHelper({ publicKey, privateKey });

jwtKeyRouter.post('/', userHelper.signInUser.bind(userHelper));
jwtKeyRouter.get('/home', userHelper.verifyAuthToken.bind(userHelper), (req, res) => {
  const page = generateHome(req.user);
  res.send(page);
});

module.exports = { jwtKeyRouter };
