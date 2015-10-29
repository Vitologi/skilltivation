Router.configure({
    layoutTemplate: 'main'
});

Router.map(function() {

    // main page
    this.route('home', {path: '/'});

    // user source list
    this.route('sourceList', {path: '/sources'});
});