var Reflux = require('reflux');

var data = [];

var UserStore = Reflux.createStore({
    userData: {
        id: "1",
        username: "David",
        score: 150
    },

    init: function() {
        console.log('UserStore initialized');
    },
    getInitialState: function(){
    	return this.userData;
    },
    onGetScore: function() {

    }
});

module.exports = UserStore;
