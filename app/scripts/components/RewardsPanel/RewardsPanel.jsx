var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var Modal = require('react-modal');

var RewardButton = require("./RewardButton");

var ScrollbarWrapper = require('react-scrollbars').ScrollbarWrapper;
var AppActions = require("../../actions/AppActions");
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
        width: '100%',
        listStyleType: 'none',
        margin: '0',
        padding: '0'
    },
    item: {
        display: 'inline'
    }
};

var msgStyle = {
    color: '#FFFFFF',
    position: 'absolute',
    top: '36%',
    left: '50%',
    width: '180px',
    fontSize: '15px',
    opacity: '0.8',
    marginLeft: '-60px',
};

var RewardsPanel = React.createClass({
    mixins: [Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],

    clickReward: function(reward) {
        AppActions.clickOnService(reward);
        AppActions.openReward(reward);
    },
    render: function() {
        var rewards = this.state.appData.rewards;
        var isShow = "hide";
        var list = _.map(rewards, function(reward){
            var method = function(){};

            if (reward.purchasable) {
                method = this.clickReward;
            }

            return (
                <li key={reward.id} style={panelStyle.item}>
                    <RewardButton  onClick={method} reward={reward} />
                </li>
            )
        }.bind(this));

        if (list.length == 0) {
            isShow = "show";
        }

        return (
            <div style={panelStyle}>
                <p className={isShow} style={msgStyle}>No rewards are available</p>
                <ul style={panelStyle.list}>
                    {list}
                </ul>
            </div>
        );
    }
});

module.exports = RewardsPanel;
