var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var AppStore = require('../../stores/AppStore');
var UserActions = require('../../actions/UserActions');
var Animate = require('rc-animate');

var scoreBoxStyle = {
    backgroundColor: '#14200f',
    width: '100px',
    height: '100px',
    marginTop: '80px',
    position: 'absolute',
};

var ScoreBox = React.createClass({
    mixins: [Router.Navigation,
			Router.State,
            Reflux.connect(AppStore, 'appData')],

    render: function() {
        return (
            <div>
              <div style={scoreBoxStyle}>
                  <p className={this.state.appData.animations.scoreboxAddedAnim}>{this.state.appData.user.added}</p>
                  <p className={this.state.appData.animations.scoreboxScoreAnim}>{this.state.appData.user.score}</p>
                  <p className={this.state.appData.animations.scoreboxPtsAnim}>points</p>
              </div>
            </div>
        );
    }
});

module.exports = ScoreBox;
