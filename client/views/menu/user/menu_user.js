Template.menuUser.helpers({

    /**
     * User sources count
     *
     * @returns {int}
     */
    "sourceCount":function(){
        return Sources.find({"user":Meteor.userId()}).count();
    }
});
