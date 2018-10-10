
function generateBody(head, body) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    ${head}
  </head>
  <body>
    ${body}
  </body>
  </html>
  `
};

function generateRedirectPage() {
  const headString = `
    <title>Unauthorized</title>
    <meta http-equiv="refresh" content="0; URL='/auth'" />
  `;
  return generateBody(headString, '');
}

function generateLoginPage(error = false) {
  const head = `<title> Login Page </title>`;
  const body = `
  Signin page
  ${error ? '<h1 style="color:red;">Error, invalid login</h1>' : ''}
    <form id="login_page">
      <label>
        user name
        <input type="text" id="user_name">
      </label>
      <label>
        password
        <input type="text" id="password">
      </label>
      <button onclick="loginsimple()">Simple Login</button>
      <button onclick="loginsecret()">Secret JWT Login</button>
      <button onclick="loginpubpriv()">Public Private Key</button>
    </form>
  `;
}

module.exports = { generateBody };

