var knex = require('../config/db.js').knex;
var bookshelf = require('bookshelf')(knex);
var bcrypt   = require('bcrypt-nodejs');


var UserModel = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userId',
    validPassword: function() {
      console.log(this.get('password'));
    }
});

module.exports.User = UserModel;