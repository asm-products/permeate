Router.configure({
  layoutTemplate: 'publicLayout',
  // waitOn: function () {
  //   return Meteor.subscribe('currentUserProfile');
  // }
});

Router.route('/', {name: 'marketingHome'});


Router.route('/:owner/conversations/create', {
  name: 'conversationsCreate',
  data: function() {  }
});

Router.route('/:owner/conversations', {
  name: 'conversationsList',
  controller: RouteController.extend({
    findOptions: function() {
      return {sort: {submitted: -1}, limit: 9999};
    },
    waitOn: function() {
      return Meteor.subscribe('conversationsList', this.params.owner, this.findOptions());
    },
    data: function() { 
      return Conversations.find({
        owner: this.params.owner
      });
    }
  })
});

Router.route('/:owner/conversations/:slug', {
  name: 'conversationsRead',
  data: function() {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});

Router.route('/:owner/conversations/:slug/update', {
  name: 'conversationsUpdate',
  data: function() {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});