const mockUser = {
  loggedin: true,
  user_id: 0,
  username: 'chrisprocks',
  password: 'asdf123456',
  title: 'Programming God',
  rights: ['write_js', 'write_css', 'write_html']
};

const { JWTHelper } = require('./jwt');
const { generateRedirectPage } = require('./html');

class UserHelper {

  constructor(secret) {
    this.jwtHelper = new JWTHelper(secret);
  }

  /**
 * Validate auth token
 * @param {express req} req 
 * @param {express res} res 
 * @param {express next} next 
 */
  async verifyAuthToken(req, res, next) {
    if (!req.cookies.authorization) { 
      const page = generateRedirectPage();
      res.send(page);
    } else {
      try {
        const token = req.cookies.authorization;
        const data = await this.jwtHelper.readToken(token);
        if (!data || !data.loggedin) { throw new Error('Invalid user'); }
        req.user = data;
        next();
      } catch (err) {
        console.log('error with token', err);
        res.status(400);
        res.json({ error: 'bad request' });
      }
    }
  }

  /**
   * Sign in a user
   * @param {express req} req 
   * @param {express res} res 
   * @param {express res}
   */
  async signInUser(req, res) {
    console.log('body', req.body);
    if (!req.body || !req.body.username || !req.body.password) {
      res.status(400);
      res.json({ error: 'bad request' });
    } else {
      const user = this.matchUser(req.body);
      if (!user) {
        res.status(401);
        res.json({ error: 'unathorized' });
      } else {
        const token = await this.jwtHelper.generateToken(mockUser);
        res.cookie('authorization', token)
        res.json({ success: true });
      }
    }
  }

  /**
   * In a real app this would look in a database for the user
   * For our purposes we just match the mockuser defined above
   * @param {User} user 
   */
  matchUser(user) {
    return user.username === mockUser.username && user.password === mockUser.password ?
      mockUser :
      undefined;
  }
}

module.exports = { UserHelper };
