Meteor.publish('conversationsList', function(owner, options) {
  console.log('publish::conversationsList');
  console.log('publish::conversationsList owner: ', owner);
  console.log('publish::conversationsList options: ', options);

  check(owner, String);
  check(options, {
    sort: Object,
    limit: Number
  });

  return Conversations.find({owner: owner}, options);
});

Meteor.publishComposite('conversationsItem', function (owner, slug, options) {
  return {
    find: function () {
      console.log('publish::conversationsItem');
      console.log('publish::conversationsItem owner: ', owner);
      console.log('publish::conversationsItem slug: ', slug);

      check(owner, String);
      check(slug, String);


      return Conversations.find({owner: owner, slug: slug});
    },
    children: [
      {
        find: function (conversation) {
          return Messages.find({
            conversation: conversation._id
          });
        }
      }
    ]
  }
});
