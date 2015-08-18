var React = require('react');
var ReactMDL = require('react-mdl');

var ProfileImage = require('./ProfileImage/ProfileImage');
var ScoreBox = require('./ScoreBox/ScoreBox');
var CoverImage = require('./CoverImage/CoverImage');
var ServicesPanel = require('./ServicesPanel/ServicesPanel');
var QuestionsList = require('./QuestionsList/QuestionsList');

var headerStyle = {
    backgroundColor: '#81d05f',
    height: '200px'
};

var AppHeader = React.createClass({
  render: function() {
    return (
      <div>
          <div style={headerStyle}>
              <CoverImage />
              <ProfileImage />
              <ScoreBox />
              <ServicesPanel />
              <QuestionsList />
          </div>
      </div>
    );
  }
});

module.exports = AppHeader;
