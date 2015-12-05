var mongodb = require('../tools/mongodb.js');
var crypto = require('crypto');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var UserSchema = new Schema({
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  phone: { type: String, default: '' },
  
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () { return this._password });

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongo.model('User');

  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

UserSchema.path('username').validate(function (username, fn) {
  var User = mongo.model('User');

  if (this.isNew || this.isModified('username')) {
    User.find({ username: username }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'User name already exists');

UserSchema.path('username').validate(function (username) {
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('phone').validate(function (phone, fn) {
  var User = mongo.model('User');

  if (this.isNew || this.isModified('phone')) {
    User.find({ phone: phone }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Phone already exists');

UserSchema.path('phone').validate(function (phone) {
  return phone.length;
}, 'Phone cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length && this._password.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

UserSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

var model;

if (mongo.models.User) {
  model = mongo.model('User');
} else {
  model = mongo.model('User', UserSchema);
}
module.exports = model;