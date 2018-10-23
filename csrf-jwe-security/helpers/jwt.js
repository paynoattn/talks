const jwt = require('jsonwebtoken');

class JWTHelper {

  // set a token, and create an empty response for destroyed tokens
  constructor(secret, expiresIn = '1h') {
    this.secret = secret;
    // default to 1h but changeable
    this.expiresIn = expiresIn;
    const signOptions = {
      issuer: 'myapp',
      expiresIn: '12h'
    };
    if (typeof secret === 'object') {
      signOptions.algorithm = 'RS256';
    }
    this.signOptions = signOptions;
  }

  /**
   * Read the token provided by the request
   * @param {string} token 
   * @param {secret key or string} secret 
   */
  readToken(token, secret = this.secret) {
    if (typeof secret === 'object') { secret = secret.publicKey; }
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, this.signOptions, (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }

  /**
   * 
   * @param {any} data 
   * @param {any} secret 
   */
  generateToken(data, secret = this.secret) {
    // if using public / private key signing use the public key to sign token
    if (typeof secret === 'object') {
      secret = secret.privateKey;
    }
    return new Promise((resolve, reject) => {
      jwt.sign(data, secret, this.signOptions, (err, token) => {
        // if there is problem with secret or other error send err
        if (err) { reject(err); }
        // else resolve token
        resolve(token);
      });
    });
  }
}

module.exports = { JWTHelper }
