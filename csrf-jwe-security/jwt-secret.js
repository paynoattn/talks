const express = require('express');
const jwtSecretRouter = express.Router();

const jwtHelper = require('./helpers/jwt');

module.exports = { jwtSecretRouter };
