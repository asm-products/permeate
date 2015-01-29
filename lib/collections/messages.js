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
    },
    label: "Created At"
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    label: "Updated At"
  },
  service: {
    type: String,
    label: "Service",
  },
  body: {
    type: String,
    label: "Body"
  },
  author: {
    type: String,
    label: "Author"
  },
  raw: {
    type: Object,
    label: "Raw data from service"
  },
  conversation: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Conversation"
  },
  addedByUser: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Added by User"
  },
  addedByService: {
    type: String,
    label: "Added by Service"
  }

}));