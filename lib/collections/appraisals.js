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
        label: "Appraisal weight",
        min: 0.00,
        max: 1.00
    }
});

Appraisals.attachSchema(AppraisalsSchema);

Meteor.methods({


    /**
     * Add new appraisals
     *
     * @param appraisalAttributes
     */
    appraisalInsert: function(appraisalAttributes) {

        var appraisal = _.extend(appraisalAttributes, {
            userId: Meteor.userId()
        });

        if(Appraisals.find({
                userId:appraisal.userId,
                sourceId:appraisal.sourceId,
                tagId:appraisal.tagId
            }).count() !== 0)return;

        Appraisals.insert(appraisal);
    },

    appraisalRemove: function(appraisalId){
        // TODO: create removing
    }

});