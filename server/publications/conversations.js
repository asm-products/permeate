Meteor.publish('conversationsList', function(owner, options) {
  check(owner, String);

  check(options, {
    sort: Object,
    limit: Number
  });

  console.log('owner: ', owner);
  console.log('options: ', options);

  return Conversations.find({owner: owner}, options);
});
