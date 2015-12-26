Authors = new Meteor.Collection("authors");

var AuthorsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Author name",
        min: 1,
        max: 40
    }
});

Authors.attachSchema(AuthorsSchema);

Meteor.methods({


    /**
     * Add new author
     *
     * @param {Object} parameters       - author attributes
     * @param {String} parameters.name  - author's name
     * @return {String|Boolean}         - new author's Id
     */
    createAuthor: function(parameters) {
        if(!this.userId)return false;

        var name = parameters.name;

        return Authors.insert({"name":name});
    },

    /**
     * Remove author
     *
     * @param {Object} parameters       - author attributes
     * @param {String} parameters.id    - author's id
     * @param {String} parameters.title - author's name
     * @returns {*}
     */
    deleteAuthor: function(parameters){
        if(!this.userId)return false;

        var id = parameters.id,
            name = parameters.name;

        if(!id && !name)return Debugger.error(null, "Wrong arguments for removing the author");

        if(id){
            return Authors.remove(id);
        }else{
            return Authors.remove({"name":name});
        }
    },

    /**
     * Add many authors
     *
     * @param {Object} parameters           - author attributes
     * @param {String[]} parameters.names   - author names
     * @return {String[]|Boolean}           - new author Ids
     */
    createManyAuthors: function(parameters){
        if(!this.userId)return false;

        parameters = parameters || {};

        if(!Array.isArray(parameters.names))return Debugger.error(null, "Method needs array of names");

        var ids = [],
            names = parameters.names,
            i = 0, len = names.length;

        for(;i<len;i++){
            ids.push(Authors.insert({"name":names[i]}));
        }

        return ids;
    }

});