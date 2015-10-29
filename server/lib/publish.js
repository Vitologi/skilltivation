
Meteor.publish("userSources", function(userId){
    var chosenUser = userId || this.userId;
    return Sources.find({"userId":chosenUser});
});