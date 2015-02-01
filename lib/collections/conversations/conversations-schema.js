Conversations = new Mongo.Collection('conversations');

Conversations.attachSchema(new SimpleSchema({
  createdAt: {
    type: Date,
      autoValue: function () {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  owner: {
    type: String,
    label: 'Owner\'s Slug'
  },
  slug: {
    type: String,
    autoValue: function () {
      return URLify2(this.field('title').value);
    }
  },
  title: {
    type: String,
    label: 'Title',
    max: 200
  },
  description: {
    type: String,
    label: 'Description',
    optional: true
  },
  messages: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    label: 'Messages',
    optional: true
  },
  addedByUser: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Creator',
    optional: true
  },
  addedByService: {
    type: String,
    label: 'Added by Service',
    optional: true
  }
}));