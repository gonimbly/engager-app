var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var UserStore = require('../../stores/UserStore');

var scoreBoxStyle = {
    backgroundColor: '#111f26',
    width: '80px',
    height: '80px',
    marginTop: '100px',
    position: 'absolute',
    score: {
        color: '#ffffff',
        fontSize: '20px',
        height: '6px',
        marginTop: '25%'
    },
    text: {
        color: '#ffffff',
        height: '6px'
    }

};

var ScoreBox = React.createClass({
    mixins: [Router.Navigation,
			Router.State,
            Reflux.connect(UserStore, 'userData')],

    render: function() {
        return (
            <div>
              <div style={scoreBoxStyle}>
                  <p style={scoreBoxStyle.score} className="text-center">{this.state.userData.score}</p>
                  <p style={scoreBoxStyle.text} className="text-center">points</p>
              </div>
            </div>
        );
    }
});

module.exports = ScoreBox;
