Sources = new Meteor.Collection("sources");

var SourceSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "User id"
    },
    createdAt: {
        type: Date,
        label: "Added date"
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
     * @param {Object} parameters           - source attributes
     * @param {String} parameters.title     - source's title
     * @param {String} parameters.typeId    - source's type
     * @return {String|Boolean}             - new source's Id
     */
    createSource: function(parameters) {
        if(!this.userId)return false;

        var source = {
            userId: this.userId,
            createdAt: new Date(),
            title: parameters.title,
            typeId: parameters.typeId,
            authorIds: [],
            locked:false,
            duplicateId: null
        };

        return Sources.insert(source);
    },

    /**
     * Remove source
     *
     * @param {Object} parameters       - source attributes
     * @param {String} parameters.id    - source's id
     * @returns {*}
     */
    deleteSource: function(parameters){
        if(!this.userId)return false;

        parameters = parameters || {};

        var id = parameters.id,
            source;

        if(!id)return Debugger.error(null, "Wrong arguments for removing the source");

        source = Sources.findOne(id);

        if(!source)return Debugger.error(null, "Can't find the source");
        if(source.locked)return Debugger.error(null, "Can't remove locked source");

        Sources.remove(id);
    },

    /**
     * Set authors for source
     *
     * @param {Object} parameters           - source attributes
     * @param {String} parameters.id        - source's id
     * @param {String} parameters.authors   - source's authors
     * @returns {*}
     */
    setSourceAuthors: function(parameters){
        if(!this.userId)return false;

        parameters = parameters || {};
        if(!Array.isArray(parameters.authors))return Debugger.error(null, "Provided authors must be an array");
        if(!parameters.id)return Debugger.error(null, "For set authors to source need source id");

        var id = parameters.id,
            source = Sources.findOne(id);

        if(!source)return Debugger.error(null, "Can't find the source");
        if(source.locked)return Debugger.error(null, "Can't update locked source");

        source.authorIds = parameters.authors;

        Sources.update(id, {$set:source});
    }

});