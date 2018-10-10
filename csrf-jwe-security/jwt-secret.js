const express = require('express');
const jwtSecretRouter = express.Router();

const { JWTHelper } = require('./helpers/jwt');
const { JWT_SECRET } = require('./secrets/jwt_secret');
const authHelpers = require('./helpers/user');

const jwtHelper = new JWTHelper(JWT_SECRET);

jwtSecretRouter.post('/', authHelpers.validateUser, (req, res) => {
  // do some things
});


module.exports = { jwtSecretRouter };
