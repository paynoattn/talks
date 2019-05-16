const { Client } = require('pg');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const processPort = parseInt(process.env['PORT']);
const port = !isNaN(processPort) ? processPort : 5000;

const connectionSettings = config.get('db');
console.log('Connecting to DB', connectionSettings);
const client = new Client(connectionSettings);

app.get('/', async (req, res) => {
  await client.connect();
  const dbres = await client.query('SELECT $1::text as message', ['Hello world!']);
  await client.end();
  res.json({ dbres });
});

app.listen(port, () => console.log(`Server listening on ${port}`));
