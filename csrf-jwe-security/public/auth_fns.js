function login() {
  const form = document.querySelector('#login');
  const username = form.querySelector('#user_name').value;
  const password = form.querySelector('#password').value;
  const userReq = { username, password };
  console.log('attempting login', userReq);
  // probably not use fetch not in chrome
  fetch('/auth/secret', { method: 'POST', body: JSON.stringify(userReq) })
    .then(res => {
      console.log('Response?', res);
      if (res.success) {
        window.location.href = 'http://localhost:5000/';
      }
    })
    .catch(err => {
      console.error('Error', err);
    });
}

