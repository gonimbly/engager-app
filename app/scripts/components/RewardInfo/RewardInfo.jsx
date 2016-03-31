var React = require('react');
var Radium = require('radium');
var Reflux = require('reflux');
var ReactMDL = require('react-mdl');
var Button = ReactMDL.Button;
var isMobile = require('ismobilejs');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var RewardInfo = React.createClass({
  mixins: [Reflux.connect(AppStore, 'appData')],
  onClick: function(reward){
    this.props.onClick(reward);
  },

  style: {
    lineContainer: {
      color: 'white',
      textAlign: 'center'
    },
    allLines: {
      textAlign: 'center'
    },
    lineRedeem: {
      fontSize: '18px',
      marginBottom: '10px',
      fontWeight: '200'
    },
    buttonRedeem: {
      backgroundColor: '#71c04f',
      color: '#FFFFFF',
      marginBottom: '10px',
      fontWeight: 'bold',
      textTransform: 'none'
    },
    line1: {
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '20px'
    },
    line2: {
      fontSize: '14px',
      paddingBottom: '10px'
    },
    line3: {
      backgroundColor: '#B0D579',
      color: '#3B3B3A',
      textAlign: 'center',
      paddingTop: '8px',
      paddingBottom: '6px',
      fontWeight: '200',
      fontSize: '16px'
    }
  },

  launchApp: function() {
    // uber://?action=applyPromo&promo=mypromo
    var url;
    if(isMobile.any) {
      url = 'uber://?action=applyPromo&promo=' + this.state.appData.redeemedCode.text;
      window.location = url;
    }
  },

  render: function() {
    var lines;
    var style = this.style;
    var reward = this.state.appData.rewards[0];
    var pointsRemaining = reward.cost - this.state.appData.user.score;
    if(pointsRemaining <= 0) {
      lines = (
        <div>
          <div style={[style.allLines, style.lineRedeem]}>You unlocked free Uber Credit!</div>
          <Button className="text-center tint" style={style.buttonRedeem} raised ripple onClick={AppActions.openReward.bind(this, reward)}>Redeem</Button>
        </div>
      );
    } else {
      var helpText;
      if(this.state.appData.redeemedReward) {
        helpText = (
          <div style={style.line3} onClick={this.launchApp}>You have <b>{this.state.appData.redeemedReward.description}</b><br/> Click here to launch!</div>
        );
      } else {
        helpText = (
          <div style={style.line3}>
            Answer the questions below to earn points.
          </div>
        );
      }
      lines = (
        <div>
          <div style={[style.allLines, style.line1]}>{pointsRemaining} points</div>
          <div style={[style.allLines, style.line2]}>to earn free Uber credit.</div>
          {helpText}
        </div>
      );
    }

    return (
      <div style={style.lineContainer}>
        {lines}
      </div>
    );
  }
});

module.exports = Radium(RewardInfo);
