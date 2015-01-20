Meteor.publish('conversationsList', function(owner, options) {
  check(owner, String);

  check(options, {
    sort: Object,
    limit: Number
  });

  return Conversations.find({owner: owner}, options);
});
