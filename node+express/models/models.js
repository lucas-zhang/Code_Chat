var knex = require('../config/db.js').knex;
var bookshelf = require('bookshelf')(knex);
var bcrypt   = require('bcrypt-nodejs');


var UserModel = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userId',

});

var FriendshipModel = bookshelf.Model.extend({
  tableName: 'friends',
  userId1: function(){
    return this.belongsTo(UserModel, ['userId']);
  },
  userId2: function(){
    return this.belongsTo(UserModel,['userId']);
  }

});

var SubsetModel = bookshelf.Model.extend({

  tableName: 'subset',
  id: function(){
    return this.belongsTo(UserModel, ['userId']);
  }
});

module.exports.User = UserModel;
module.exports.Friendship = FriendshipModel;
module.exports.Subset = SubsetModel;