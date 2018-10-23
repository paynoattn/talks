const express = require('express');
const jwtSecretRouter = express.Router();

const { generateHome } = require('./helpers/html');
const { JWT_SECRET } = require('./secrets/jwt_secret');
const { UserHelper } = require('./helpers/user');
const userHelper = new UserHelper(JWT_SECRET);

jwtSecretRouter.post('/', userHelper.signInUser.bind(userHelper));
jwtSecretRouter.get('/home', userHelper.verifyAuthToken.bind(userHelper), (req, res) => {
  const page = generateHome(req.user);
  res.send(page);
});

module.exports = { jwtSecretRouter };
