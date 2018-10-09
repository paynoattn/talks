
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

module.exports = { generateBody };

