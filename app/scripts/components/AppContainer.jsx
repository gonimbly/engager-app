var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Modal = require('react-modal');

var ProfileImage = require('./ProfileImage/ProfileImage');
var ScoreBox = require('./ScoreBox/ScoreBox');
var CoverImage = require('./CoverImage/CoverImage');
var RewardsPanel = require('./RewardsPanel/RewardsPanel');
var QuestionsList = require('./QuestionsList/QuestionsList');
var ServicesActions = require("../actions/ServicesActions");
var AppStore = require('../stores/AppStore');
var RewardPopup = require('./RewardPopup/RewardPopup');


var headerStyle = {
    backgroundColor: '#81d05f',
    height: '200px'
};

var modalStyle = {

};

var AppContainer = React.createClass({
    mixins: [Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
              <div>
                  <div style={headerStyle}>
                      <CoverImage />
                      <ProfileImage />
                      <ScoreBox />
                      <RewardsPanel />
                      <QuestionsList />
                  </div>
                  <RewardPopup />
              </div>
        );
    }
});

module.exports = AppContainer;
