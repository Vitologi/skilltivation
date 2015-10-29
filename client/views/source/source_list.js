Template.sourceList.helpers({
    "sources":function(){
        return Sources.find({"userId":Meteor.userId()},{sort:{created:-1}});
    }
});

Template.sourceList.events({
    'submit form': function(e) {
        e.preventDefault();

        var source = {
            title: $(e.target).find('[name=title]').val()
        };


        Meteor.call('sourceInsert', source, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
        });
    }
});