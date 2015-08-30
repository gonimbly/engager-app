var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout');
var MainWindow = require('./components/MainWindow');
var RegisterWindow = require('./components/RegisterWindow');
var LoginWindow = require('./components/LoginWindow');
var UserProfileWindow = require('./components/UserProfileWindow');

var routes = (
	<Route name="layout" path="/" handler={Layout}>
		<DefaultRoute handler={LoginWindow} />
		<Route name="signup" handler={RegisterWindow} />
		<Route name="signin" handler={LoginWindow} />
		<Route name="profile" handler={UserProfileWindow} />
		<Route name="wallet" handler={MainWindow} />
	</Route>
);

exports.start = function() {
  Router.run(routes, function (Handler) {
		React.render(<Handler />, document.getElementById('content'));
	});
}
