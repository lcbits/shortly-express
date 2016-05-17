var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var salt = bcrypt.genSaltSync();
      model.set('salt', salt);
      var hash = bcrypt.hashSync(model.get('password') + salt);
      model.set('hash', hash);
      model.set('password', null);
    });
  }
});

module.exports = User;