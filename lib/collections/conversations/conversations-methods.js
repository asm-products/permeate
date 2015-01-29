
Meteor.methods({
  conversationsInsert: function(document, modifier) {
    check(Meteor.userId(), String);

    console.log('document: ', document);

    var conversationId = Conversations.insert(document);
    var tempOwnerId = document.owner;

    Owners.update(
      tempOwnerId,
      {
        $addToSet: {
          conversations: conversationId
        }
      }
    );


    return {
      _id: conversationId
    };
  }
});