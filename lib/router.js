Router.configure({
  layoutTemplate: 'publicLayout'
});

Router.route('/', {name: 'marketingHome'});


Router.route('/:owner/conversations', {
  name: 'conversationList',
  waitOn: function() {
    return Meteor.subscribe('conversations', this.params.owner, options);
  },
  data: function() { return Conversations.find({
    owner: this.params.owner
  }); }
});
Router.route('/:owner/conversations/:slug', {
  name: 'conversationItem',
  data: function() { return Conversations.findOne({
    owner: this.params.owner, slug: this.params.slug
  }); }
});