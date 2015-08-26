var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var Modal = require('react-modal');

var RewardButton = require("./RewardButton");

var ScrollbarWrapper = require('react-scrollbars').ScrollbarWrapper;
var ServicesActions = require("../../actions/ServicesActions");
var AppStore = require('../../stores/AppStore');

var panelStyle = {
    backgroundColor: '#14200f',
    height: '80px',
    width: '100%',
    position: 'absolute',
    top: '200px',
    whiteSpace: 'nowrap',
    list: {
        overflowX: 'scroll',
        width: 'auto',
        listStyleType: 'none',
        margin: '0',
        padding: '0'
    },
    item: {
        display: 'inline'
    }
};

var RewardsPanel = React.createClass({
    mixins: [Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],

    clickReward: function(reward) {
        ServicesActions.clickOnService(reward);
        ServicesActions.openReward(reward);
    },
    render: function() {
        var rewards = this.state.appData.rewards;

        var list = _.map(rewards, function(reward){

            var method = function(){};

            if (reward.className === "service-button-selected") {
                method = this.clickReward;
            }

            return (
                <li key={reward.id} style={panelStyle.item}>
                    <RewardButton  onClick={method} reward={reward} />
                </li>
            )
        }.bind(this));

        return (
            <div style={panelStyle}>
                <ul style={panelStyle.list}>
                    {list}
                </ul>
            </div>
        );
    }
});

module.exports = RewardsPanel;
