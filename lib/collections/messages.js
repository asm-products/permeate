Messages = new Mongo.Collection('messages');

Messages.attachSchema(new SimpleSchema({
  createdAt: {
    type: Date,
      autoValue: function() {
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
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  service: {
    type: String,
    label: "Service",
  },
  text: {
    type: String,
    label: "text"
  },
  author: {
    type: String
  },
  raw: {
    type: Object
  },
  conversation: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  addedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }

}));