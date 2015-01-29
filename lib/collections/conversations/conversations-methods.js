
Meteor.methods({
  conversationsInsert: function(document, modifier) {
    check(Meteor.userId(), String);

    var conversationId = Conversations.insert(document);

    return {
      _id: conversationId
    };
  }
});