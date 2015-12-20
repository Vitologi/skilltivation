Template.debug.onRendered(function(){
    Meteor.call('getServerTests', function(error, result) {

        if (error)
            return alert(error.reason);

        Session.set("serverTests", result);
    });
});


Template.debug.helpers({

    /**
     * All static tests
     *
     * @returns {Array}
     */
    "serverTests":function(){
        return Session.get("serverTests");
    }
});