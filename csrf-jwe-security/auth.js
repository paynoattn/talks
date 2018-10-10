const express = require('express');
const authRouter = express.Router();

const fs = require('fs');

const { JWTHelper } = require('./helpers/jwt');
const { JWT_SECRET } = require('./secrets/jwt_secret');

const jwtHelper = new JWTHelper(JWT_SECRET);

const { generateLoginPage } = require('./helpers/html');

authRouter.get('/', async(req, res) => {
  const page = generateLoginPage();
  res.send(page);
});

module.exports = { authRouter };
