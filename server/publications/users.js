// Publish a person's own user profile to themselves
Meteor.publish('usersProfile', function (userId) {
  try{
    return Meteor.users.find({_id: this.userId}, {fields: {
      '_id': true,
      'username': true,
      'owner': true,
      'profile': true,
      'profile.name': true,
      'profile.avatar': true,
      'profile.username': true,

      'profile.address': true,
      'profile.city': true,
      'profile.state': true,
      'profile.zip': true,

      'emails': true,
      'emails[0].address': true,
      'emails.address': true
    }});

  }catch(error){
    console.log(error);
  }
});

// Publish the user directory which everbody can see
Meteor.publish("usersDirectory", function () {
  try{
    return Meteor.users.find({}, {fields: {
      '_id': true,
      'username': true,
      'owner': true,
      'profile': true,
      'profile.name': true,
      'profile.avatar': true,
      'profile.username': true,

      'emails': true,
      'emails[0].address': true,
      'emails.address': true
    }});
  }catch(error){
    console.log(error);
  }
});