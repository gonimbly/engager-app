var React = require('react');
var ReactMDL = require('react-mdl');
var Router = require('react-router');
var Reflux = require('reflux');
var AppActions = require("../actions/AppActions");
var AppStore = require('../stores/AppStore');

var UserProfileWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
            <div>
                <p>Your content - user profile</p>
            </div>
        );
    }
});

module.exports = UserProfileWindow;
