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

Meteor.publish('conversationsItem', function(owner, slug) {
  console.log('publish::conversationsItem');
  console.log('publish::conversationsItem owner: ', owner);
  console.log('publish::conversationsItem slug: ', slug);

  check(owner, String);
  check(slug, String);


  return Conversations.find({owner: owner, slug: slug});
});
