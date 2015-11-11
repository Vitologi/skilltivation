Template.menuUser.helpers({

    /**
     * User sources count
     *
     * @returns {int}
     */
    "sourceCount":function(){
        return Sources.find({"userId":Meteor.userId()}).count();
    }
});
