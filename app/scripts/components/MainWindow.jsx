var React = require('react');
var ReactMDL = require('react-mdl');

var AppContainer = require('./AppContainer');

var MainWindow = React.createClass({
  render: function() {
    return (
        <div>
            <AppContainer />
        </div>
    );
  }
});

module.exports = MainWindow;
