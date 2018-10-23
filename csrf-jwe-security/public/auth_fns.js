function login(key) {
  // get the elements for username / password and their value
  const form = document.querySelector('#login');
  const username = form.querySelector('#user_name').value;
  const password = form.querySelector('#password').value;
  const userReq = { username, password };
  console.log('attempting login', userReq);
  // make a request with the users' username / password
  // TODO: probably not use as no support not in chrome / firefox
  const path = key ? '/auth/key' : '/auth/secret';
  fetch(path, {
      method: 'POST',
      body: JSON.stringify(userReq),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('Response?', res);
      if (res.success) {
        const path = key ? '/auth/key/home' : '/auth/secret/home';
        window.location.href = 'http://localhost:5000' + path;
      }
    })
    .catch(err =>  console.error('Error', err));
}
