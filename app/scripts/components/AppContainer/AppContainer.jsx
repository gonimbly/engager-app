var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Modal = require('react-modal');

var ProfileImage = require('../ProfileImage/ProfileImage');
var ScoreBox = require('../ScoreBox/ScoreBox');
var CoverImage = require('../CoverImage/CoverImage');
var RewardInfo = require('../RewardInfo/RewardInfo');
var QuestionsList = require('../QuestionsList/QuestionsList');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var RewardPopup = require('../RewardPopup/RewardPopup');
var RewardClaimTooltip = require('../RewardClaimTooltip/RewardClaimTooltip');
var Spinner = require('react-spinkit');4
var logoImage = require('../../../images/GoNimbly_Horizontal_75.svg');

require('./AppContainer.scss');

var AppContainer = React.createClass({
  mixins: [Router.Navigation,
           Router.State,
           Reflux.connect(AppStore, 'appData')],

  render: function() {

    if(this.state.appData.loadingInfo) {
      app= (
        <div style={{position: 'absolute', top: '60%', left: '45%', zIndex: '1000'}} className={this.state.appData.loadingInfo}>
            <Spinner spinnerName='three-bounce'/>
        </div>
      );
    } else {
      app = (
        <div>
          <div className='header'>
            <div className='logo'>
              <a href='http://www.gonimbly.com/contact' target='blank'>
                <img src={logoImage} height='30' alt="Go Nimbly" />
              </a>
            </div>
            <RewardClaimTooltip />
            <CoverImage />
            <ProfileImage />
            <RewardInfo />
          </div>
          <QuestionsList />
          <RewardPopup />
        </div>
      );
    }
    return (
      <div className='app-container'>
        {app}
      </div>
    );
  }
});

module.exports = AppContainer;
