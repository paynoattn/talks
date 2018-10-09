const jwt = require('jsonwebtoken');

class JWTHelper {

  // set a token, and create an empty response for destroyed tokens
  constructor(secret) {
    this.secret = secret;
    this.destroyedTokens = [];
  }

  /**
   * Destroy a token
   * @param {string} token 
   */
  destroyToken(token) {
    this.destroyedTokens.push(token);
  }

  /**
   * Read the token provided by the request
   * @param {string} token 
   * @param {secret key or string} secret 
   */
  readToken(token, secret = this.secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, undefined, (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }

  /**
   * Validate a working jwt token
   * @param {express request} req 
   * @param {express response} res 
   * @param {express next func} next 
   */
  validateToken(req, res, next, secret = this.secret) {
    if (typeof secret === 'object') { secret = secret.privateKey; }
    this.readToken(req.token, this.secret)
      .then(tokenData => {
        if (!this.destroyedTokens.includes(req.token)) {
          req.tokenData = tokenData;
          next();
        }
        else {
          console.error('destroyed token');
          throw new Error('Expired token');
        }
      })
      .catch(err => {
        console.error('error with token', err);
        res.status(403);
        res.json({ error: 'Unauthorized' });
      });
  }

  /**
   * 
   * @param {any} data 
   * @param {any} secret 
   */
  generateToken(data, secret = this.secret) {
    if (typeof secret === 'object') { secret = secret.publickey; }
    return new Promise((resolve, reject) => {
      jwt.sign(data, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) { reject(err); }
        console.log('signed token', token);
        resolve(token);
      });
    });
  }
}

module.exports = { JWTHelper }
