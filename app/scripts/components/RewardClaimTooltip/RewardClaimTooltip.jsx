var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');
var AppActions = require("../../actions/AppActions");
var CopyToClipboard = require('react-copy-to-clipboard');

var RewardClaimTooltip = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
            <div className={this.state.appData.animations.rewardToolbarAnim}>
                <p style={{margin: '0px'}}>+ {this.state.appData.selectedReward.name} Credit, Tap to Copy!</p>
                <CopyToClipboard style={{
                        margin: '0px',
                        backgroundColor: '#000000',
                        padding: '0px',
                        border: 'none',
                        outline: '0'
                    }} text={this.state.appData.selectedReward.code || ''}>
                        {this.state.appData.selectedReward.code}
                </CopyToClipboard>
            </div>
        );
    }
});

module.exports = RewardClaimTooltip;
