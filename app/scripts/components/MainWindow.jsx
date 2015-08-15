var React = require('react');
var ReactMDL = require('react-mdl');

var AppHeader = require('./AppHeader');

var Button = ReactMDL.Button;
var Card = ReactMDL.Card;

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
