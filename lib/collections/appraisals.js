Appraisals = new Meteor.Collection("appraisals");

var AppraisalsSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "User id"
    },
    sourceId: {
        type: String,
        label: "Source id"
    },
    tagId: {
        type: String,
        label: "Tag id"
    },
    weight: {
        type: Number,
        decimal:true,
        label: "Appraisal weight",
        min: 0.00,
        max: 1.00
    }
});

Appraisals.attachSchema(AppraisalsSchema);

Meteor.methods({

    /**
     * Add new appraisal to source
     *
     * @param {Object} parameters           - appraisal attributes
     * @param {String} parameters.sourceId  - estimated source
     * @param {String} parameters.tagId     - tag for create appraisal
     * @return {String|Boolean}             - new appraisal's Id
     */
    createAppraisal: function(parameters) {
        if(!this.userId)return false;

        var appraisal = {
            userId: this.userId,
            sourceId:parameters.sourceId,
            tagId:parameters.tagId,
            weight:0.5
        };

        if(Appraisals.find(appraisal).count() !== 0)return Debugger.error(null, "Appraisal is already exists");

        return Appraisals.insert(appraisal);
    },

    /**
     * Remove appraisal
     *
     * @param {Object} parameters       - appraisal attributes
     * @param {String} parameters.id    - appraisal's id
     * @returns {*}
     */
    deleteAppraisal: function(parameters){
        if(!this.userId)return false;

        parameters = parameters || {};

        var id = parameters.id,
            appraisal;

        if(!id)return Debugger.error(null, "Wrong arguments for removing the appraisal");

        appraisal = Appraisals.findOne({"_id":id, "userId":this.userId});

        if(!appraisal)return Debugger.error(null, "Removed appraisal not found");

        Appraisals.remove(id);
    }

});