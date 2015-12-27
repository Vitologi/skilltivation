Router.configure({
    layoutTemplate: 'main'
});

SourcesListController = RouteController.extend({
    template:'sourceList',
    increment:5,
    limit:function(){
        return parseInt(this.params.sourcesLimit) || 5;
    },
    findOptions:function(){
        return {sort:{createdAt:-1}, limit: this.limit()};
    },
    subscriptions:function(){
        Meteor.subscribe('Sources', this.findOptions());
    },
    sources:function(){
        return Sources.find();
    },
    data:function(){
        var hasMore = this.sources().fetch().length === this.limit(),
            nextPath = this.route.path({sourcesLimit: this.limit() + this.increment});

        return {
            sources: this.sources(),
            nextPath: hasMore ? nextPath : null
        };
    }
});



Router.map(function() {

    // main page
    this.route('home', {
        path: '/'
    });

    // user source list
    this.route('sourceList', {
        path: '/sources/:sourcesLimit?',
        controller:SourcesListController
    });
});