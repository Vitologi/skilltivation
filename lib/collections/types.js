Types = new Meteor.Collection("types");

var TypeSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 5,
        max: 200,
        unique: true
    }
});

Types.attachSchema(TypeSchema);

Meteor.methods({

    /**
     * Add new source type
     *
     * @param {Object} parameters       - type attributes
     * @param {String} parameters.title - types title
     * @return {String|Boolean}         - new types Id
     */
    createType: function(parameters) {
        if(!this.userId)return false;

        var title = parameters.title;

        return Types.insert({"title":title});
    },

    /**
     * Remove type
     *
     * @param {Object} parameters       - type attributes
     * @param {String} parameters.id    - types id
     * @param {String} parameters.title - types title
     * @returns {*}
     */
    deleteType: function(parameters){
        if(!this.userId)return false;

        var id = parameters.id,
            title = parameters.title;

        if(!id && !title)return Debugger.error(null, "Wrong remove type arguments");

        if(id){
            return Types.remove(id);
        }else{
            return Types.remove({"title":title});
        }
    }

});
