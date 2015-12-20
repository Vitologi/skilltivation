Sources = new Meteor.Collection("sources");

var SourceSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "User id"
    },
    createdAt: {
        type: Date,
        label: "Added by user"
    },
    title: {
        type: String,
        label: "Title",
        min: 5,
        max: 200
    },
    typeId: {
        type: String,
        label: "Source type"
    },
    authorIds: {
        type: [String],
        label: "Author ids",
        optional: true
    },
    locked:{
        type: Boolean,
        label: "Source is locked for edit",
        optional: true
    },
    duplicateId: {
        type: String,
        label: "Is duplicate of",
        optional: true
    }
});

Sources.attachSchema(SourceSchema);

Meteor.methods({

    /**
     * Add new source
     *
     * @param sourceAttributes
     */
    sourceInsert: function(sourceAttributes) {
        if(!this.userId)throw new Meteor.Error("User is not defined");

        sourceAttributes.userId = this.userId;
        sourceAttributes.createdAt = new Date();

        Sources.insert(sourceAttributes);
    },

    sourceRemove: function(sourceId){
        // TODO: create removing source
    }

});