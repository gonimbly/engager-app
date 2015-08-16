var React = require('react');
var ReactMDL = require('react-mdl');

var AppHeader = require('./AppHeader');

var MainWindow = React.createClass({
  render: function() {
    return (
        <div>
            <AppHeader />
        </div>
    );
  }
});

module.exports = MainWindow;
