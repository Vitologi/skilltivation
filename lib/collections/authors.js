Authors = new Meteor.Collection("authors");

var AuthorsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Author name",
        min: 5,
        max: 40
    }
});

Authors.attachSchema(AuthorsSchema);

Meteor.methods({


    /**
     * Add new author
     *
     * @param authorAttributes
     */
    authorInsert: function(authorAttributes) {
        if(!Meteor.user())return;
        Authors.insert(authorAttributes);
    },

    authorRemove: function(authorId){
        // TODO: create removing source type
    }

});