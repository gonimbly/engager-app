var Reflux = require('reflux');

var data = [];

var ServicesStore = Reflux.createStore({
    servicesData: [
        {
            id: "1",
            name: "Uber",
            price: "$10",
            points: "300"
        },
        {
            id: "2",
            name: "Uber2",
            price: "$10",
            points: "300"
        }
    ],

    init: function() {
        console.log('ServicesStore initialized');
    },
    getInitialState: function(){
        return this.servicesData;
    }
});

module.exports = ServicesStore;
