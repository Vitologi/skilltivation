// Create debug object for unit tests
Debugger = new Debug({
    "tag": Debug.ASSERTION
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
                storedUserId = _this.userId;

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

                    Meteor.call("deleteType", {});

                });


            });

            Debugger.group("Checking Authors methods", function(){

                var testAuthorTitle = "Test_author_name";

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

                    Meteor.call("deleteType", {});

                });


            });
        }

    });

}
