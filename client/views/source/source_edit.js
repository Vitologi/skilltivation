var authors, tags;

Template.sourceEdit.onRendered(function () {

    $('.source-edit-choser').tooltip();

    // Save open panels
    if(Session.get("showAuthor")){
        Session.set("showAuthor", null);
        $("a[href=#source-edit-authors]").click();
    }
    if(Session.get("showTags")){
        Session.set("showTags", null);
        $("a[href=#source-edit-tags]").click();
    }

    // Material tags (add plugin)
    authors = vitologi.inputtags($('#source-edit-authors input').get(0),{
        "source":function(currentData){
            return [{_id:"azazaza", name:"Author 1"}, {_id:"azazaza",  name:"Author 2"}];
        },

        keyName:"_id",
        valueName:"name"
    });

    tags = vitologi.inputtags($('#source-edit-tags input').get(0),{
        "source":function(currentData){
            return ["Tag 1", "Tag 2"];
        },

        duplicate: true
    });

});


Template.sourceEdit.helpers({

    "sourceTypes":function(){
        return Types.find();
    },

    "showAuthor":function(){
        return Session.get("showAuthor");
    },

    "showTags":function(){
        return Session.get("showTags");
    }
});

Template.sourceEdit.events({

    // simple checkers
    "click a[href=#source-edit-authors]":function(){Session.set("showAuthor", !Session.get("showAuthor"));},
    "click a[href=#source-edit-tags]":function(){Session.set("showTags", !Session.get("showTags"));},

    // source add
    'submit form': function(e) {
        e.preventDefault();

        var source = {
                title: $(e.target).find('[name=title]').val(),
                typeId: $(e.target).find('[name=source_type]').val()
            },
            sourceAuthors = authors.getVal(),
            sourceTags = tags.getVal();


        Meteor.call('sourceInsert', source, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            console.log(sourceAuthors, sourceTags);

        });
    }

});





