// currentUserSlug = function() {
//   return 'howdy';
// }

(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {


  Template.navigation.helpers({
    currentUserSlug: function () {
      return Meteor.user().profile.slug;
    }
  });


}).call(this);

})();