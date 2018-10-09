const http = require('http');
const app = require('./app');

const port = process.env.APP_PORT = 5000;
// app.set('port', port);
const server = http.createServer(app);

server.listen(port, err => {
  if (err) { console.error(err); }
  console.log('Server created on port ' + port);
});

server.on('error', error => console.error('Server Error: ', err));
server.on('close', console.info('Server closing'));
