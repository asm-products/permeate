(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;
var URLify2 = Package['peerlibrary:urlify2'].URLify2;


(function () {

  if (Meteor.isClient) {
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_AND_EMAIL'
    });
  }

  if (Meteor.isServer) {
    Accounts.onCreateUser(function (options, user) {

      user.profile = options.profile || {};
      user.profile.slug = URLify2(user.username);

      return user;
    });
  }

}).call(this);

})();