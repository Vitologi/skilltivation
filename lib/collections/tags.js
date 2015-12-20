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
     * Add new source tag
     *
     * @param {Object} parameters       - tag attributes
     * @param {String} parameters.title - tags title
     * @return {String|Boolean}         - new tags Id
     */
    createTag: function(parameters) {
        if(!this.userId)return false;

        var title = parameters.title;

        return Tags.insert({"title":title});
    },

    /**
     * Remove tag
     *
     * @param {Object} parameters       - tag attributes
     * @param {String} parameters.id    - tags id
     * @param {String} parameters.title - tags title
     * @returns {*}
     */
    deleteTag: function(parameters){
        if(!this.userId)return false;

        var id = parameters.id,
            title = parameters.title;

        if(!id && !title)return Debugger.error(null, "Wrong remove tag arguments");

        if(id){
            return Tags.remove(id);
        }else{
            return Tags.remove({"title":title});
        }
    }

});