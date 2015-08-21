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
                price: 10,
                points: 300,
                className: "service-button-base",
                questions: [
                    {
                        id: "1",
                        text: "bla blafdkjhdlkfjh lsdk fjhg lksdfjh glksd jhfg lksdj hfl lfdkjg lskdjf glsd fghlsd kfjghdls  bla?",
                        points: 5
                    },
                    {
                        id: "2",
                        text: "bla bla bla id 2?",
                        points: 12
                    },
                    {
                        id: "3",
                        text: "bla bla bla id 3?",
                        points: 20
                    },
                    {
                        id: "4",
                        text: "bla bla bla id 4?",
                        points: 10
                    },
                ],
                answered: [
                    {
                        id: "5",
                        text: "bla bla bla id 5?",
                        points: 1
                    }
                ],
            },
            {
                id: "2",
                name: "Uber2",
                price: 10,
                points: 300,
                className: "service-button-base",
                questions: [
                    {
                        id: "1",
                        text: "bla bla barak bla?",
                        points: 5
                    },
                    {
                        id: "2",
                        text: "bla bla bla?",
                        points: 5
                    },
                    {
                        id: "3",
                        text: "bla bla bla?",
                        points: 5
                    },
                    {
                        id: "4",
                        text: "bla bla bla?",
                        points: 5
                    },
                    {
                        id: "5",
                        text: "bla bla bla?",
                        points: 5
                    }
                ],
                answered: [],
            },
        ],
    },
    init: function() {
        console.log('ServicesStore initialized');
        this.servicesData.services[0].className = "service-button-selected";
        this.servicesData.lastSelection = this.servicesData.services[0];

        // sort the list.
        this.sortJson();

        this.listenTo(ServicesActions.clickOnService, this.onClickService);
        this.listenTo(ServicesActions.answerQuestion, this.onAnswerQuestion);
        this.listenTo(ServicesActions.dismissQuestion, this.onDismissQuestion);
    },
    getInitialState: function(){
        return this.servicesData;
    },
    sortJson: function() {
        this.servicesData.services.forEach(function(el, index, arr) {
            el.questions.sort(function(a, b) {
                var aPoints = parseInt(a.points);
                var bPoints = parseInt(b.points);

                if (aPoints == bPoints) {
                    return 0;
                }

                if (aPoints > bPoints) {
                    return -1;
                }

                if (aPoints < bPoints) {
                    return 1;
                }
            });
        });
    },
    onClickService: function(service) {
        var i = _.indexOf(this.servicesData.services, service);
        this.servicesData.lastSelection.className = "service-button-base";
        this.servicesData.services[i].className = "service-button-selected";
        this.servicesData.lastSelection = this.servicesData.services[i];
        this.trigger(this.servicesData);
    },
    onAnswerQuestion: function(question) {
        var qs = this.servicesData.lastSelection.questions;
        var i = _.indexOf(qs, question);

        var j = _.indexOf(this.servicesData.services, this.servicesData.lastSelection);
        var service = this.servicesData.services[j];

        service.answered.push(qs[i]);
        service.questions.splice(i,1);

        this.trigger(this.servicesData);
    },
    onDismissQuestion: function(question) {
        var qs = this.servicesData.lastSelection.questions;
        var i = _.indexOf(qs, question);

        var j = _.indexOf(this.servicesData.services, this.servicesData.lastSelection);
        this.servicesData.services[j].questions.splice(i,1);
        this.trigger(this.servicesData);
    }
});

module.exports = ServicesStore;
