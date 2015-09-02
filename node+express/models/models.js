var knex = require('../config/db.js').knex;
var bookshelf = require('bookshelf')(knex);
var bcrypt   = require('bcrypt-nodejs');


var UserModel = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userId',

});

var FriendshipModel = bookshelf.Model.extend({
  tableName: 'friends',

})

module.exports.User = UserModel;
module.exports.Friendship = FriendshipModel;