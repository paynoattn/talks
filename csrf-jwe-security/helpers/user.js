const mockUser = {
  user_id: 0,
  username: 'chrisprocks',
  password: 'asdf123456',
  title: 'Programming God',
  rights: ['write_js', 'write_css', 'write_html']
};

function validateUser(req, res, next) {
  if (req.body.password === mockUser.password) {
    next();
  }
  else {
    res.status(401);
    res.json({ error: 'Unauthorized' });
  }
}


