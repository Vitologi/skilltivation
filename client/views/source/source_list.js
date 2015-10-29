Template.sourceList.helpers({
    "sources":function(){
        return Sources.find({"userId":Meteor.userId()},{sort:{created:-1}});
    }
});