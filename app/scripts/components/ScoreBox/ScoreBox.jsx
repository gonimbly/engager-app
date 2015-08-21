var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var UserStore = require('../../stores/UserStore');
var UserActions = require('../../actions/UserActions');

var scoreBoxStyle = {
    backgroundColor: '#14200f',
    width: '100px',
    height: '100px',
    marginTop: '80px',
    position: 'absolute',
    score: {
        color: '#ffffff',
        fontSize: '23px',
        fontWeight: 'bold',
        height: '6px',
        marginTop: '30%'
    },
    text: {
        color: '#ffffff',
        height: '6px'
    },
    added: {
        position: 'absolute',
        right: '0',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '17px',
        marginRight: '10px',
        marginTop: '6px'
    }
};

var ScoreBox = React.createClass({
    mixins: [Router.Navigation,
			Router.State,
            Reflux.connect(UserStore, 'userData')],

    increasePoints: function() {
        UserActions.increasePoints();


    },

    render: function() {
        return (
            <div>
              <div style={scoreBoxStyle}>
                  <p style={scoreBoxStyle.added}>{this.state.userData.added}</p>
                  <p style={scoreBoxStyle.score} className="text-center">{this.state.userData.score}</p>
                  <p style={scoreBoxStyle.text} className="text-center">points</p>
              </div>
            </div>
        );
    }
});

module.exports = ScoreBox;
