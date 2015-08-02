var knex = require('../config/db.js').knex;
var bookshelf = require('bookshelf')(knex);
var bcrypt   = require('bcrypt-nodejs');


var UserModel = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userId',
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },


});

module.exports = UserModel;