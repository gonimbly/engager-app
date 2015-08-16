var Reflux = require('reflux');
var _ = require('lodash');

var ServicesActions = require("../actions/ServicesActions");

var data = [];

var ServicesStore = Reflux.createStore({
    lastSelection: {},
    servicesData: [
        {
            id: "1",
            name: "Uber",
            price: "$10",
            points: "300",
            className: "service-button-base"
        },
        {
            id: "2",
            name: "Uber2",
            price: "$10",
            points: "300",
            className: "service-button-base"
        },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
        // {
        //     id: "2",
        //     name: "Uber2",
        //     price: "$10",
        //     points: "300"
        // },
    ],
    init: function() {
        console.log('ServicesStore initialized');
        this.servicesData[0].className = "service-button-selected";
        this.lastSelection = this.servicesData[0];

        this.listenTo(ServicesActions.clickOnService, this.onClickService);
    },
    getInitialState: function(){
        return this.servicesData;
    },
    onClickService: function(service) {
        var i = _.indexOf(this.servicesData, service);
        this.lastSelection.className = "service-button-base";
        this.servicesData[i].className = "service-button-selected";
        this.lastSelection = this.servicesData[i];
        this.trigger(this.servicesData);
    }
});

module.exports = ServicesStore;
