Types = new Meteor.Collection("types");

var TypeSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 5,
        max: 200
    }
});

Types.attachSchema(TypeSchema);

Meteor.methods({


    /**
     * Add new source type
     *
     * @param typeAttributes
     */
    typeInsert: function(typeAttributes) {
        if(!Meteor.user())return;
        Types.insert(typeAttributes);
    },

    typeRemove: function(typeId){
        // TODO: create removing source type
    }

});