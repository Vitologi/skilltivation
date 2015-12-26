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
            return Tags.find({title:filter}).fetch();
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
            author, tag, insertedSourceId,
            i, len;

        Meteor.call('createSource', source, function(err, result) {

            if (err)return alert(err.reason);

            insertedSourceId = result;

            // divides new and old authors
            for(i= 0, len=sourceAuthors.length; i<len;i++){
                author = sourceAuthors[i];
                if(author._id === author.name){
                    newAuthors.push(author.name);
                }else{
                    resultAuthors.push(author._id);
                }
            }

            // append its to source
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

            // divides new and old tags
            for(i= 0, len=sourceTags.length; i<len;i++){
                tag = sourceTags[i];
                if(tag._id === tag.title){
                    newTags.push(tag.title);
                }else{
                    resultTags.push(tag._id);
                }
            }

            for (i = 0, len = resultTags.length; i < len; i++) {
                tag = resultTags[i];

                Meteor.call("createAppraisal", {"sourceId": insertedSourceId, "tagId": tag}, function (err, result) {
                    if (err)return alert(err.reason);
                })
            }

            for (i = 0, len = newTags.length; i < len; i++) {
                tag = newTags[i];

                Meteor.call('createTag', {"title":tag}, function(err, result){
                    if (err)return alert(err.reason);

                    tag = result;

                    Meteor.call('createAppraisal',{"sourceId": insertedSourceId, "tagId": tag}, function(err, result){
                        if (err)return alert(err.reason);
                    });

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





