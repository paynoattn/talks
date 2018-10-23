const express = require('express');
const loginRouter = express.Router();

const fs = require('fs');

const { JWTHelper } = require('./helpers/jwt');
const { JWT_SECRET } = require('./secrets/jwt_secret');

const jwtHelper = new JWTHelper(JWT_SECRET);

const { generateLoginPage } = require('./helpers/html');

loginRouter.get('/', async(req, res) => {
  // generate a csrf token for validating token came from out site
  const csrf = await jwtHelper.generateToken({ loggedIn: false });
  res.cookie('csrf', csrf);
  const page = generateLoginPage();
  res.send(page);
});

module.exports = { loginRouter };
