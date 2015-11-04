UserSources = new Meteor.Collection("userSources");

var UserSourcesSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "User id"
    },
    sourceId: {
        type: String,
        label: "Source id"
    },
    createdAt: {
        type: Date,
        label: "Added by user"
    }
});

UserSources.attachSchema(UserSourcesSchema);

Meteor.methods({


    /**
     * Add new source to user
     *
     * @param sourceId
     */
    userSourceInsert: function(sourceId) {
        var userId = Meteor.userId();

        if(UserSources.find({userId:userId, sourceId:sourceId}).count() !== 0)return;

        UserSources.insert({
            userId: userId,
            sourceId: sourceId,
            createdAt: new Date()
        });
    },

    /**
     * Remove source from user list
     *
     * @param sourceId
     */
    userSourceRemove: function(sourceId){
        var userId = Meteor.userId();

        UserSources.remove({
            userId: userId,
            sourceId: sourceId
        });
    }

});