const mockUser = {
  user_id: 0,
  username: 'chrisprocks',
  password: 'asdf123456',
  title: 'Programming God',
  rights: ['write_js', 'write_css', 'write_html']
};

const { generateLoginPage  } = require('./html');

function validateLoggedIn(req, res, next) {
  if (req.token.data && req.token.data.loggedin) {
    next();
  } else {
    res.status(401);
    const page = generateLoginPage(true);
    res.send(page);
  }
}

function validateUser(user) {
  if (user.username === mockUser.username && user.password === mockUser.password) {
    return mockUser;
  } else {
    throw new Error('Invalid user');
  }
}

