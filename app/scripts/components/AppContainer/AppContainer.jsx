var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Modal = require('react-modal');

var ProfileImage = require('../ProfileImage/ProfileImage');
var ScoreBox = require('../ScoreBox/ScoreBox');
var CoverImage = require('../CoverImage/CoverImage');
var RewardsPanel = require('../RewardsPanel/RewardsPanel');
var QuestionsList = require('../QuestionsList/QuestionsList');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var RewardPopup = require('../RewardPopup/RewardPopup');
var RewardClaimTooltip = require('../RewardClaimTooltip/RewardClaimTooltip');
var Spinner = require('react-spinkit');
var logoImage = require('../../../images/gonimbly_logo.png');

require('./AppContainer.scss');

var AppContainer = React.createClass({
    mixins: [Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
              <div className='app-container'>
                  <div style={{position: 'absolute', top: '60%', left: '45%', zIndex: '1000'}} className={this.state.appData.loadingInfo}>
                      <Spinner spinnerName='three-bounce'/>
                  </div>
                  <div className='header'>
                      <div>
                        <div className='logo'>
                          <a href='http://www.gonimbly.com/contact' target='blank'>
                            <img src={logoImage} width='100px' height='50px'/>
                          </a>
                        </div>
                      </div>
                      <RewardClaimTooltip />
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