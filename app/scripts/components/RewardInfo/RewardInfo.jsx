var React = require('react');
var Radium = require('radium');
var Reflux = require('reflux');
var ReactMDL = require('react-mdl');
var Button = ReactMDL.Button;

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
      fontSize: '14px',
      marginBottom: '10px'
    },
    buttonRedeem: {
      backgroundColor: '#71c04f',
      color: '#FFFFFF',
      marginBottom: '10px'
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
      paddingTop: '7px',
      paddingBottom: '3px',
      fontWeight: '300'
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
          <Button className="text-center" style={style.buttonRedeem} raised={true} ripple={true} onClick={AppActions.openReward.bind(this, reward)}>Redeem</Button>
        </div>
      );
    } else {
      var helpText;
      if(this.state.appData.redeemedReward) {
        helpText = (
          <div style={style.line3}>We just sent {this.state.appData.selectedReward.description} <br />to your email!</div>
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
