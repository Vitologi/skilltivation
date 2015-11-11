Template.sourceList.helpers({
    "sources":function(){
        return Sources.find({},{sort:{created:-1}});
    }
});