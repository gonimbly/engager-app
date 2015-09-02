var React = require('react');
var Radium = require('radium');

var RewardButton = React.createClass({
    PropTypes:{
		reward: React.PropTypes.object.isRequired,
		onClick: React.PropTypes.func.isRequired
	},

    onClick: function(reward){
		this.props.onClick(reward);
	},

    render: function() {
        var reward = this.props.reward;

        return (
            <span>
                <button className={reward.className} onClick={this.onClick.bind(this, reward)}>
                    <span><strong>{reward.name}</strong></span>
                    <br/>
                    <span style={{fontWeight: "200"}}>{reward.cost}pts</span>
                </button>
            </span>
        );
    }
});

module.exports = Radium(RewardButton);
