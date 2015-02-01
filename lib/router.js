Router.configure({
  layoutTemplate: 'publicLayout',
  // waitOn: function () {
  //   return Meteor.subscribe('currentUserProfile');
  // }
});

Router.route('/', {name: 'marketingHome'});


Router.route('/:owner/conversations/create', {
  name: 'conversationsCreate',
  data: function () {  }
});

Router.route('/:owner/conversations', {
  name: 'conversationsList',
  controller: RouteController.extend({
    findOptions: function () {
      return {sort: {createdAt: -1}, limit: 9999};
    },
    waitOn: function () {
      console.log('conversationsList::waitOn');

      console.log('conversationsList::waitOn this.params: ', this.params);
      console.log('conversationsList::waitOn this.findOptions(): ', this.findOptions());
      return Meteor.subscribe('conversationsList', this.params.owner, this.findOptions());
    },
    conversationsList: function () {
      return Conversations.find(
        {
          owner: this.params.owner
        },
        this.findOptions()
      );
    },
    data: function () {
      return {
        conversationsList: this.conversationsList()
      };
    }
  })
});

Router.route('/:owner/conversations/:slug', {
  name: 'conversationsItem',
  waitOn: function () {
    return Meteor.subscribe('conversationsItem', this.params.owner, this.params.slug);
  },
  data: function () {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});

Router.route('/:owner/conversations/:slug/update', {
  name: 'conversationsUpdate',
  data: function () {
    return Conversations.findOne({
      owner: this.params.owner,
      slug: this.params.slug
    });
  }
});