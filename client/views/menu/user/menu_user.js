Template.menuUser.onRendered(function(){
   Meteor.call("getSourcesCount", function(err, result){
       if(err)return alert(err.reason);

       Session.set("sourcesCount", result);
   });
});

Template.menuUser.helpers({

    /**
     * User sources count
     *
     * @returns {int}
     */
    "sourcesCount":function(){
        return Session.get("sourcesCount");
    }
});
