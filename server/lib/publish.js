
// Publish source types
Meteor.publish("Types", function(){
    return Types.find();
});

// Publish sources
Meteor.publish("Sources", function(options){
    return Sources.find({}, options);
});

// Publish source tags
Meteor.publish("Tags", function(){
    return Tags.find();
});

// Publish appraisals
Meteor.publish("Appraisals", function(){
    return Appraisals.find();
});

// Publish authors
Meteor.publish("Authors", function(){
    return Authors.find();
});