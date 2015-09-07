
var knex = require('knex')({
  client: 'mysql',
  connection: {
      host: 'localhost',  // your host
      user: 'root', // your database user
      password: 'password', // your database password
      database: 'chat',
      charset: 'utf8'
  }
});



module.exports.knex = knex;