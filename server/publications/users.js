// Publish a person's own user profile to themselves


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;


(function () {


  Meteor.publish(
    'currentUserProfile',
    function () {
      if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
          },
          {
            fields: {
              profile: 1,
              username: 1,
              emails: 1,
              owner: 1
            }
          }
        );
      } else {
        return null;
      }
    }, {
      is_auto: true
    }
  );


}).call(this);

})();

// // Publish the user directory which everbody can see
// Meteor.publish("usersDirectory", function (options) {
//   check(options, {
//     sort: Object,
//     limit: Number
//   });

//   return Meteor.users.find({}, {fields: {
//     '_id': true,
//     'username': true,
//     'owner': true,
//     'profile': true,
//     'profile.name': true,
//     'profile.avatar': true,
//     'profile.username': true,

//     'emails': true,
//     'emails[0].address': true,
//     'emails.address': true
//   }});
// });