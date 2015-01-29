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
  slug: {
    type: String,
    autoValue: function () {
      return URLify2(this.title);
    }
  },
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  description: {
    type: String,
    label: "Description"
  },
  messages: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    label: "Messages"
  },
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Creator"
  }
}));