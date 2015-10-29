Template.sourceEdit.onRendered(function(){
    $('.source-edit-choser')
        .tooltip()
        .collapse();
});

Template.sourceEdit.events({
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



