var React = require('react');
var React = require('react');
var AppContainer = require('./AppContainer/AppContainer');
var Router = require('react-router');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var Cookie = require('react-cookie');
var FastClick = require('react-fastclick-alt');

var MainWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        var token = Cookie.load('usertoken');

        if (token == undefined || !this.state.appData.user.isSignin) {
            window.location = "/#/signin";
        }

        return <FastClick><AppContainer /></FastClick>;
    }
});

module.exports = MainWindow;
