Sources = new Meteor.Collection("sources");

Meteor.methods({

    sourceInsert: function(sourceAttributes) {
        //check(Meteor.userId(), String);
        //check(sourceAttributes, {
        //    title: String
        //});

        var user = Meteor.user(),
            source = _.extend(sourceAttributes, {
                userId: user._id,
                authors: [],
                created: new Date()
            });

        Sources.insert(source);

    }

});