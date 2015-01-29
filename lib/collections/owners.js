Owners = new Mongo.Collection('owners');

Owners.attachSchema(new SimpleSchema({
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
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Owner ID"
  },
  ownerType: {
    type: String,
    allowedValues: ['user', 'org'],
    label: "Owner Type"
  }

}));