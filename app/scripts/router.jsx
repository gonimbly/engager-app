var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Helmet = require('react-helmet');

var Layout = require('./components/layout');
var MainWindow = require('./components/MainWindow');
var RegisterWindow = require('./components/RegisterWindow');
var LoginWindow = require('./components/LoginWindow');
var UserProfileWindow = require('./components/UserProfileWindow');

var link = [
  {rel: 'apple-touch-icon', href: require('../images/icons/ENGAGER_ICON_1024-60@2x.png')},
  {rel: 'apple-touch-icon', sizes: '180x180', href: require('../images/icons/ENGAGER_ICON_1024-60@3x.png')},
  {rel: 'apple-touch-icon', sizes: '76x76', href: require('../images/icons/ENGAGER_ICON_1024-76.png')},
  {rel: 'apple-touch-icon', sizes: '152x152', href: require('../images/icons/ENGAGER_ICON_1024-76@2x.png')},
  {rel: 'apple-touch-icon', sizes: '58x58', href: require('../images/icons/ENGAGER_ICON_1024-76@2x.png')}
];

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
    var app = (
      <div>
        <Helmet titleTemplate='Engager | %s' link={link} />
        <Handler />
      </div>
    );
    React.render(app, document.getElementById('content'));
  });
}
