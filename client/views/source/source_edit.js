Template.sourceEdit.onRendered(function(){
    $('.source-edit-choser')
        .tooltip();
});

Template.sourceEdit.onRendered(function () {

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
    $('#source-edit-authors input').tagsinput();
    $('#source-edit-tags input').tagsinput();


});


Template.sourceEdit.helpers({
    "showAuthor":function(){
        return Session.get("showAuthor");
    },

    "showTags":function(){
        return Session.get("showTags");
    },

    "existAuthors":function(){
        return [
            {"_id":1, "name":"Фленеган"},
            {"_id":2, "name":"Кроксфорд"},
            {"_id":3, "name":"Шопэн"}
        ];
        return Session.get("authors");
    },

    "existTags":function(){
        return [
            {"_id":1, "name":"css"},
            {"_id":2, "name":"javascript"},
            {"_id":3, "name":"html"}
        ];
        return Session.get("authors");
    }
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
    },

    "click a[href=#source-edit-authors]":function(){
        Session.set("showAuthor", !Session.get("showAuthor"));
    },

    "click a[href=#source-edit-tags]":function(){
        Session.set("showTags", !Session.get("showTags"));
    }
});





