Meteor.publish('messagesList', function(conversation, options) {
  console.log('publish::messagesList');
  console.log('publish::messagesList conversation: ', conversation);
  console.log('publish::messagesList options: ', options);

  check(conversation, String);
  check(options, {
    sort: Object,
    limit: Number
  });

  return Messages.find({conversation: conversation}, options);
});