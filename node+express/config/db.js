


var knex = require('knex')({
  client: 'mysql',
  connection: {
      host: 'localhost',  // your host
      user: 'root', // your database user
      password: 'lzdbpass', // your database password
      database: 'chat_app',
      charset: 'utf8'
  }
});



module.exports.knex = knex;