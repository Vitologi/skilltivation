Template.sourceItem.onRendered(function () {

});


Template.sourceItem.helpers({

    "authors":function(){
        return Authors.find({"_id":{$in:this.authorIds}});
    }

});

Template.sourceItem.events({

    "click [name=deleteSource]":function(){
        var sourceId = this._id;

        Meteor.call("deleteSourceAppraisals", {"id":sourceId}, function(err, result){
            if (err)return alert(err.reason);

            Meteor.call("deleteSource", {"id":sourceId}, function(err, result){
                if (err)return alert(err.reason);
            })

        });

    }

});





