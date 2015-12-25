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
            var filter = new RegExp('^'+currentData);
            return Authors.find({name:filter}).fetch();
        },

        keyName:"_id",
        valueName:"name"
    });

    tags = vitologi.inputtags($('#source-edit-tags input').get(0),{
        "source":function(currentData){
            var filter = new RegExp('^'+currentData);
            return Tags.find({name:filter}).fetch();
        },

        keyName:"_id",
        valueName:"title"
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
    'click .createSource': function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $form = $("form.sourceEdit"),
            source = {
                title: $form.find('[name=title]').val(),
                typeId: $form.find('[name=source_type]').val()
            },
            sourceAuthors = authors.getVal(),
            sourceTags = tags.getVal(),
            resultAuthors = [],
            resultTags = [],
            newAuthors = [],
            newTags = [],
            author, tag, insertedSourceId;

        Meteor.call('createSource', source, function(err, result) {

            if (err)return alert(err.reason);

            insertedSourceId = result;

            for(var i= 0, len=sourceAuthors.length; i<len;i++){
                author = sourceAuthors[i];
                if(author._id === author.name){
                    newAuthors.push(author.name);
                }else{
                    resultAuthors.push(author._id);
                }
            }

            if(newAuthors.length){

                Meteor.call('createManyAuthors', {'names':newAuthors}, function(err, result){
                    if (err)return alert(err.reason);

                    resultAuthors = resultAuthors.concat(result);

                    Meteor.call('setSourceAuthors',{"id":insertedSourceId, "authors":resultAuthors}, function(err, result){
                        if (err)return alert(err.reason);

                    });

                });

            }else{
                Meteor.call('setSourceAuthors',{"id":insertedSourceId, "authors":resultAuthors}, function(err, result){
                    if (err)return alert(err.reason);

                });
            }


        });

        // clear form
        $form.find('[name=title]').val("");
        authors.clear();
        tags.clear();
        return false;
    }

});





