var React = require('react');
var Modal = require('react-modal');
var Router = require('react-router');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');
var ServicesActions = require("../../actions/ServicesActions");

var content = document.getElementById('content');
Modal.setAppElement(content);
Modal.injectCSS();

var contentStyle = {
    marginLeft: '20px',
    marginRight: '20px',
};

var titleStyle = {
    color: '#71c04f',
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '30px',
    marginTop: '20px',
};

var RewardPopup = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    closeModal: function() {
        ServicesActions.closeReward();
    },
    render: function() {
        console.log("reward = "+JSON.stringify(this.state.appData.selectedReward));

        var reward = this.state.appData.selectedReward;

        return (
              <div>
                  <Modal isOpen={this.state.appData.isRewardOpen} onRequestClose={this.closeModal}>
                      <div style={contentStyle}>
                          <div style={titleStyle}>
                              <span>${reward.redeem} in {reward.name} credits</span>
                              <span style={{right: '0px', float: 'right'}}>{reward.points}pt</span>
                          </div>
                          <div>
                              <p style={{
                                      height: '80px'
                                  }}>
                                  {reward.description}
                              </p>
                          </div>
                      </div>
                      <div>
                          <button style={{
                                  width: '50%',
                                  backgroundColor: '#71c04f',
                                  color: '#FFFFFF',
                                  height: '60px',
                                  margin: '0px',
                                  outline: '0',
                                  border: 'none',
                              }}>Calim</button>
                          <button onClick={this.closeModal} style={{
                                  width: '50%',
                                  backgroundColor: '#000000',
                                  color: '#FFFFFF',
                                  height: '60px',
                                  margin: '0px',
                                  outline: '0',
                                  border: 'none',
                              }}>No Thanks</button>
                      </div>
                  </Modal>
              </div>
          );
      }
});

module.exports = RewardPopup;
