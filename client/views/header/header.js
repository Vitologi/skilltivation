Template.header.onRendered(function(){

    // [hack] Synchronize languages TODO: fix this
    TAPi18n._afterUILanguageChange = function(){
        accountsUIBootstrap3.setLanguage(TAPi18n.getLanguage());
    };
    TAPi18n._afterUILanguageChange();


});

Template.header.events({
    "click .header__options select":function(event){
        event.stopPropagation();
    }
});
