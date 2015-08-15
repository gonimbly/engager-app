var React = require('react');
var ReactMDL = require('react-mdl');

var ProfileImage = require('./ProfileImage/ProfileImage');
var ScoreBox = require('./ScoreBox/ScoreBox');
var CoverImage = require('./CoverImage/CoverImage');
var ServicesPanel = require('./ServicesPanel/ServicesPanel');

var headerStyle = {
    backgroundColor: '#57c6ff',
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
          </div>
      </div>
    );
  }
});

module.exports = AppHeader;
