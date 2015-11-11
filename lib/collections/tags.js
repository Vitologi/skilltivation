Tags = new Meteor.Collection("tags");

var TagsSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 2,
        max: 20,
        unique:true
    },
    description: {
        type: String,
        label: "Description",
        min: 5,
        max: 200,
        optional:true
    }
});

Tags.attachSchema(TagsSchema);

Meteor.methods({


    /**
     * Add new tag
     *
     * @param TagAttributes
     */
    tagInsert: function(tagAttributes) {
        if(!Meteor.user())return;
        Tags.insert(tagAttributes);
    },

    tagRemove: function(tagId){
        // TODO: create removing source type
    }

});