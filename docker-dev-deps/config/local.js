module.exports = {
  db: {
    host: process.env['DB_HOST'] || 'localhost',
    port: process.env['DB_PORT'] || 5432,
    database: process.env['DB_NAME'] || 'app',
    user: process.env['DB_USER'] || 'app',
    password: process.env['DB_PASSWORD'] || 'password'
  }
}
