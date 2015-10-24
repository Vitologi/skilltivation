Router.configure({
    layoutTemplate: 'base'
});

Router.map(function() {
    this.route('home', {path: '/'});
});

Router.map(function() {
    this.route('sourceList', {path: '/sources'});
});