var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');
var AppActions = require("../../actions/AppActions");


var RewardClaimTooltip = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
            <div className={this.state.appData.animations.rewardToolbarAnim}>
                <p style={{margin: '0px'}}>+ {this.state.appData.selectedReward.redeem}$ {this.state.appData.selectedReward.name} Credit!</p>
            </div>
        );
    }
});

module.exports = RewardClaimTooltip;
