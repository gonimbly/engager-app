var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');

var RewardClaimTooltip = React.createClass({
    mixins: [Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
            <div className={this.state.appData.animations.rewardToolbarAnim}>
                <p style={{margin: '0px'}}>We just sent {this.state.appData.selectedReward.description} <br />to your email!</p>
            </div>
        );
    }
});

module.exports = RewardClaimTooltip;
