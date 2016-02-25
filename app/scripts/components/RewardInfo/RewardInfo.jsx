var React = require('react');
var Radium = require('radium');

var RewardInfo = React.createClass({
  PropTypes:{
    reward: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  onClick: function(reward){
    this.props.onClick(reward);
  },

  style: {
    lineContainer: {
      color: 'white',
      textAlign: 'center',
      paddingBottom: '15px'
    },
    allLines: {
      textAlign: 'center'
    },
    line1: {
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '20px'
    },
    line2: {
      fontSize: '14px'
    }
  },

  render: function() {
    var reward = this.props.reward;
    var style = this.style;

    return (
      <div style={style.lineContainer}>
        <div style={[style.allLines, style.line1]}>50 points</div>
        <div style={[style.allLines, style.line2]}>till you unlock free Uber credit.</div>
      </div>
    );
  }
});

module.exports = Radium(RewardInfo);
