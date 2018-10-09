const express = require('express');
const jwtKeyRouter = express.Router();

const jwtHelper = require('./helpers/jwt');

module.exports = { jwtKeyRouter };
