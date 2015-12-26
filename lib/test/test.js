// Create debug object for unit tests
Debugger = new Debug({
    "tag": Debug.ASSERTION|Debug.ERROR
});

// Show all tests in console
Debugger.setHandler(function(event){

    if(this.isAssertion(event)){
        if(event.status){
            console.log( " + " + event.message);
        }else{
            console.error(" - " + event.message);
        }
    }else if(this.isError(event)){
        console.error(" - " + event.message);
    }

});

// Check all needed collections (client and server both)
Debugger.group("Checking collections exists", function(){
    this.assert(Sources instanceof Mongo.Collection, "Sources is instance of Mongo collection");
    this.assert(Appraisals instanceof Mongo.Collection,"Appraisals is instance of Mongo collection");
    this.assert(Authors instanceof Mongo.Collection, "Authors is instance of Mongo collection");
    this.assert(Tags instanceof Mongo.Collection, "Tags is instance of Mongo collection");
    this.assert(Types instanceof Mongo.Collection, "Types is instance of Mongo collection");
});

if(Meteor.isServer){
    var firstTimeCall = false;

    Meteor.methods({

        /**
         * Provide server(static) test to show
         */
        getServerTests: function() {

            if(!firstTimeCall){
                Meteor.call("passMethodsTests");
                firstTimeCall = true;
            }

            var a =[].concat(Debugger.getAssertions(), Debugger.getErrors());

            // Meteor hack for circular reference
            a = a.map(function(obj){
                return obj.toJSON();
            });

            return a;
        },

        /**
         * Provide method(dynamic) test to show
         */
        passMethodsTests: function() {
            var _this = this,
                storedUserId = _this.userId || "ZWsGhWFYxqnAiRFP4";

            Debugger.group("Checking Types methods", function(){

                var testTypeTitle = "Test_type";

                this.group("Check createType method", function(){
                    Types.remove({"title":testTypeTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("createType", {"title":testTypeTitle}), "Can`t create type without privileges");
                    _this.setUserId(storedUserId);

                    Meteor.call("createType", {"title":testTypeTitle});
                    this.assert(Types.findOne({title:testTypeTitle}), "Create new type by title");
                    Types.remove({"title":testTypeTitle});

                });

                this.group("Check deleteType method", function(){
                    var typeId = Types.insert({"title":testTypeTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteType", {"id":typeId, "title":testTypeTitle}), "Can`t delete type without privileges");
                    _this.setUserId(storedUserId);
                    Types.remove(typeId);

                    typeId = Types.insert({"title":testTypeTitle});
                    Meteor.call("deleteType", {"id":typeId});
                    this.assert(!Types.findOne({title:testTypeTitle}), "Delete type by id");
                    Types.remove(typeId);

                    typeId = Types.insert({"title":testTypeTitle});
                    Meteor.call("deleteType", {"title":testTypeTitle});
                    this.assert(!Types.findOne({title:testTypeTitle}), "Delete type by title");
                    Types.remove(typeId);

                    Meteor.call("deleteType", {});

                });


            });

            Debugger.group("Checking Tags methods", function(){

                var testTagTitle = "Test_tag";

                this.group("Check createTag method", function(){
                    Tags.remove({"title":testTagTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("createTag", {"title":testTagTitle}), "Can`t create Tag without privileges");
                    _this.setUserId(storedUserId);

                    Meteor.call("createTag", {"title":testTagTitle});
                    this.assert(Tags.findOne({title:testTagTitle}), "Create new Tag by title");
                    Tags.remove({"title":testTagTitle});

                });

                this.group("Check deleteTag method", function(){
                    var TagId = Tags.insert({"title":testTagTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteTag", {"id":TagId, "title":testTagTitle}), "Can`t delete Tag without privileges");
                    _this.setUserId(storedUserId);
                    Tags.remove(TagId);

                    TagId = Tags.insert({"title":testTagTitle});
                    Meteor.call("deleteTag", {"id":TagId});
                    this.assert(!Tags.findOne({title:testTagTitle}), "Delete Tag by id");
                    Tags.remove(TagId);

                    TagId = Tags.insert({"title":testTagTitle});
                    Meteor.call("deleteTag", {"title":testTagTitle});
                    this.assert(!Tags.findOne({title:testTagTitle}), "Delete Tag by title");
                    Tags.remove(TagId);

                    Meteor.call("deleteTag", {});

                });


            });

            Debugger.group("Checking Authors methods", function(){

                var testAuthorTitle = "Test_author_name",
                    testAuthorTitle2 = "Test_author_name2";

                this.group("Check createAuthor method", function(){
                    Authors.remove({"name":testAuthorTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("createAuthor", {"name":testAuthorTitle}), "Can`t create Author without privileges");
                    _this.setUserId(storedUserId);

                    Meteor.call("createAuthor", {"name":testAuthorTitle});
                    this.assert(Authors.findOne({"name":testAuthorTitle}), "Create new Author by name");
                    Authors.remove({"name":testAuthorTitle});

                });

                this.group("Check deleteAuthor method", function(){
                    var AuthorId = Authors.insert({"name":testAuthorTitle});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteAuthor", {"id":AuthorId, "name":testAuthorTitle}), "Can`t delete Author without privileges");
                    _this.setUserId(storedUserId);
                    Authors.remove(AuthorId);

                    AuthorId = Authors.insert({"name":testAuthorTitle});
                    Meteor.call("deleteAuthor", {"id":AuthorId});
                    this.assert(!Authors.findOne({"name":testAuthorTitle}), "Delete Author by id");
                    Authors.remove(AuthorId);

                    AuthorId = Authors.insert({"name":testAuthorTitle});
                    Meteor.call("deleteAuthor", {"name":testAuthorTitle});
                    this.assert(!Authors.findOne({name:testAuthorTitle}), "Delete Author by name");
                    Authors.remove(AuthorId);

                    Meteor.call("deleteAuthor", {});

                });

                this.group("Check createManyAuthors method", function(){
                    Authors.remove({"name":testAuthorTitle});
                    Authors.remove({"name":testAuthorTitle2});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("createManyAuthors", {"names":[testAuthorTitle,testAuthorTitle2]}), "Can`t create many Authors without privileges");
                    _this.setUserId(storedUserId);

                    Meteor.call("createManyAuthors", {"names":[testAuthorTitle,testAuthorTitle2]});
                    this.assert(Authors.findOne({"name":testAuthorTitle}) && Authors.findOne({"name":testAuthorTitle2}), "Create many Authors by name");
                    Authors.remove({"name":testAuthorTitle});
                    Authors.remove({"name":testAuthorTitle2});

                });

            });

            Debugger.group("Checking Sources methods", function(){

                var testSourceTitle = "Test_source_title",
                    testSource, testSourceId,
                    testType, testTypeId,
                    testAuthor, testAuthorId;

                if(testType = Types.findOne({"title":"Test_type_title"})){
                    testTypeId = testType._id;
                }else{
                    testTypeId = Types.insert({"title":"Test_type_title"});
                }

                if(testAuthor = Authors.findOne({"name":"Test_author_name"})){
                    testAuthorId = testAuthor._id;
                }else{
                    testAuthorId = Authors.insert({"name":"Test_author_name"});
                }

                this.group("Check createSource method", function(){

                    _this.setUserId(null);
                    testSourceId = Meteor.call("createSource", {"title":testSourceTitle, "typeId":testTypeId})
                    this.assert(!testSourceId, "Can`t create Source without privileges");
                    _this.setUserId(storedUserId);

                    Sources.remove(testSourceId);

                    testSourceId = Meteor.call("createSource", {"title":testSourceTitle, "typeId":testTypeId});
                    this.assert(Sources.findOne({"_id":testSourceId, "title":testSourceTitle, "typeId":testTypeId}), "Create new Source by title");
                    Sources.remove(testSourceId);

                });

                this.group("Check deleteSource method", function(){
                    testSourceId = Sources.insert({"userId":storedUserId, "createdAt": new Date(), "title":testSourceTitle, "typeId":testTypeId});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteSource", {"id":testSourceId}), "Can`t delete Source without privileges");
                    _this.setUserId(storedUserId);
                    Sources.remove(testSourceId);

                    testSourceId = Sources.insert({"userId":storedUserId, "createdAt": new Date(), "title":testSourceTitle, "typeId":testTypeId});
                    Meteor.call("deleteSource", {"id":testSourceId});
                    this.assert(!Sources.findOne({"_id":testSourceId, "title":testSourceTitle, "typeId":testTypeId}), "Delete Source by id");
                    Sources.remove(testSourceId);

                    Meteor.call("deleteSource");

                });

                this.group("Check setSourceAuthors method", function(){
                    testSourceId = Sources.insert({"userId":storedUserId, "createdAt": new Date(), "title":testSourceTitle, "typeId":testTypeId});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("setSourceAuthors", {"id":testSourceId, "authors":[testAuthorId]}), "Can`t set source authors without privileges");
                    _this.setUserId(storedUserId);

                    Meteor.call("setSourceAuthors", {"id":testSourceId, "authors":[testAuthorId]});
                    testSource = Sources.findOne(testSourceId);

                    this.assert(Authors.findOne(testSource.authorIds[0]), "Set author in source document");

                    Sources.remove(testSourceId);
                });

                Types.remove(testTypeId);
                Authors.remove(testAuthorId);

            });

            Debugger.group("Checking Appraisals methods", function(){

                var testAppraisal, testAppraisalId,
                    testSourceTitle = "Test_source_title", testSource, testSourceId,
                    testTag, testTagId,
                    testType, testTypeId,
                    testAuthor, testAuthorId;

                if(testTag = Tags.findOne({"title":"Test_tag_title"})){
                    testTagId = testTag._id;
                }else{
                    testTagId = Tags.insert({"title":"Test_tag_title"});
                }

                if(testType = Types.findOne({"title":"Test_type_title"})){
                    testTypeId = testType._id;
                }else{
                    testTypeId = Types.insert({"title":"Test_type_title"});
                }

                if(testAuthor = Authors.findOne({"name":"Test_author_name"})){
                    testAuthorId = testAuthor._id;
                }else{
                    testAuthorId = Authors.insert({"name":"Test_author_name"});
                }

                testSourceId = Sources.insert({"userId":storedUserId, "createdAt": new Date(), "title":testSourceTitle, "typeId":testTypeId});

                this.group("Check createAppraisal method", function(){

                    _this.setUserId(null);
                    testAppraisalId = Meteor.call("createAppraisal", {"sourceId":testSourceId, "tagId":testTagId});
                    this.assert(!testAppraisalId, "Can`t create Appraisal without privileges");
                    _this.setUserId(storedUserId);

                    Appraisals.remove(testAppraisalId);

                    testAppraisalId = Meteor.call("createAppraisal", {"sourceId":testSourceId, "tagId":testTagId});
                    this.assert(Appraisals.findOne({"userId":storedUserId, "sourceId":testSourceId, "tagId":testTagId}), "Create new Appraisal use source and tag");
                    Appraisals.remove(testAppraisalId);

                });

                this.group("Check deleteAppraisal method", function(){

                    testAppraisalId = Appraisals.insert({"userId":storedUserId, "sourceId":testSourceId, "tagId":testTagId, "weight":1.00});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteAppraisal", {"id":testAppraisalId}), "Can`t delete Appraisal without privileges");
                    _this.setUserId(storedUserId);
                    Appraisals.remove(testAppraisalId);

                    testAppraisalId = Appraisals.insert({"userId":storedUserId, "sourceId":testSourceId, "tagId":testTagId, "weight":1.00});
                    Meteor.call("deleteAppraisal", {"id":testAppraisalId});
                    this.assert(!Appraisals.findOne(testAppraisalId), "Delete Appraisal by id");
                    Appraisals.remove(testAppraisalId);

                    Meteor.call("deleteAppraisal");

                });


                this.group("Check deleteSourceAppraisals method", function(){

                    testAppraisalId = Appraisals.insert({"userId":storedUserId, "sourceId":testSourceId, "tagId":testTagId, "weight":1.00});

                    _this.setUserId(null);
                    this.assert(!Meteor.call("deleteSourceAppraisals", {"id":testSourceId}), "Can`t delete sources's appraisals without privileges");
                    _this.setUserId(storedUserId);
                    Appraisals.remove(testAppraisalId);

                    testAppraisalId = Appraisals.insert({"userId":storedUserId, "sourceId":testSourceId, "tagId":testTagId, "weight":1.00});
                    Meteor.call("deleteSourceAppraisals", {"id":testSourceId});
                    this.assert(!Appraisals.findOne(testAppraisalId), "Delete all appraisals by source's id");
                    Appraisals.remove(testAppraisalId);

                    Meteor.call("deleteSourceAppraisals");

                });

                Tags.remove(testTagId);
                Types.remove(testTypeId);
                Authors.remove(testAuthorId);
                Sources.remove(testSourceId);

            });

            _this.setUserId(null);
        }

    });

}
