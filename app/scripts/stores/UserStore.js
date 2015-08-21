var Reflux = require('reflux');

var data = [];

var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
    userData: {
        id: "1",
        username: "David",
        score: 160,
        added: ""
    },

    init: function() {
        console.log('UserStore initialized');

        this.listenTo(UserActions.increasePoints, this.onGetScore);
    },
    getInitialState: function(){
    	return this.userData;
    },
    onGetScore: function(question) {
        var pts = question.points;
        this.userData.added = "+"+pts;
        this.userData.score = parseInt(this.userData.score) + parseInt(pts);
        this.trigger(this.userData);
    }
});

module.exports = UserStore;
