const { JWTHelper } = require('./jwt');
const { JWT_SECRET } = require('../secrets/jwt_secret');
const jwtHelper = new JWTHelper(JWT_SECRET);

/**
 * Middleware function that handles CSRF function
 * @param {express req} req 
 * @param {express res} res 
 * @param {express next fn} next 
 */
async function validateCSRF(req, res, next) {
  if(!req.cookies || !req.cookies.csrf) {
    // hand no csrf token present
    res.status(400);
    res.json({ error: 'no csrf token' })
  }
  try {
    const cookie = req.cookies.csrf;
    await jwtHelper.readToken(cookie);
    next();
  } catch (err) {
    // handle invalid token
    res.status(403);
    res.json({ error: 'invalid token' + err });
  }
}

module.exports = { validateCSRF }
