var Reflux = require('reflux');
var _ = require('lodash');

var ServicesActions = require("../actions/ServicesActions");

var data = [];

var ServicesStore = Reflux.createStore({
    servicesData: {
        lastSelection: {},
        services: [
            {
                id: "1",
                name: "Uber",
                price: "$10",
                points: "300",
                className: "service-button-base",
                questions: [
                    {
                        id: "1",
                        text: "bla blafdkjhdlkfjh lsdk fjhg lksdfjh glksd jhfg lksdj hfl lfdkjg lskdjf glsd fghlsd kfjghdls  bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "2",
                        text: "bla bla bla?",
                        points: "5",
                        state: "1"
                    },
                    {
                        id: "3",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "4",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "5",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    }
                ]
            },
            {
                id: "2",
                name: "Uber2",
                price: "$10",
                points: "300",
                className: "service-button-base",
                questions: [
                    {
                        id: "1",
                        text: "bla bla barak bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "2",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "3",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "4",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    },
                    {
                        id: "5",
                        text: "bla bla bla?",
                        points: "5",
                        state: "0"
                    }
                ]
            },
        ],
    },
    init: function() {
        console.log('ServicesStore initialized');
        this.servicesData.services[0].className = "service-button-selected";
        this.servicesData.lastSelection = this.servicesData.services[0];

        this.listenTo(ServicesActions.clickOnService, this.onClickService);
    },
    getInitialState: function(){
        return this.servicesData;
    },
    onClickService: function(service) {
        var i = _.indexOf(this.servicesData.services, service);
        this.servicesData.lastSelection.className = "service-button-base";
        this.servicesData.services[i].className = "service-button-selected";
        this.servicesData.lastSelection = this.servicesData.services[i];
        this.trigger(this.servicesData);
    }
});

module.exports = ServicesStore;
