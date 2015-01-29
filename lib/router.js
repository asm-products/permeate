Router.configure({
  layoutTemplate: 'publicLayout',
  // waitOn: function () {
  //   return Meteor.subscribe('currentUserProfile');
  // }
});

Router.route('/', {name: 'marketingHome'});


Router.route('/:owner/conversations/create', {
  name: 'conversationCreate',
  data: function() {  }
});

Router.route('/:owner/conversations', {
  name: 'conversationList',
  waitOn: function(options) {
    return Meteor.subscribe('conversations', this.params.owner, options);
  },
  data: function() { 
    return Conversations.find({
      owner: this.params.owner
    });
  }
});

Router.route('/:owner/conversations/:slug', {
  name: 'conversationRead',
  data: function() {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});

Router.route('/:owner/conversations/:slug/update', {
  name: 'conversationUpdate',
  data: function() {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});