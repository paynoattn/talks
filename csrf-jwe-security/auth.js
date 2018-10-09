const express = require('express');
const authRouter = express.Router();

const fs = require('fs');

const { JWTHelper } = require('./helpers/jwt');
const { JWT_SECRET } = require('./secrets/jwt_secret');

const jwtHelper = new JWTHelper(JWT_SECRET);

const { generateBody } = require('./helpers/html');

authRouter.get('/', async(req, res) => {
  const csrf = await jwtHelper.generateToken({ time: Date.now() });
  const head = `<title> Login Page </title>`;
  const body = `
  Signin page`;
  const page = generateBody(head, body);
  res.cookie('csrftoken', csrf, { maxAge: 900000, httpOnly: true, secure: true });
  res.send(page);
});

module.exports = { authRouter };
