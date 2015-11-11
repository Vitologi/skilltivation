Sources = new Meteor.Collection("sources");

var SourceSchema = new SimpleSchema({
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
        if(!Meteor.user())return;
        Sources.insert(sourceAttributes);
    },

    sourceRemove: function(sourceId){
        // TODO: create removing source
    }

});