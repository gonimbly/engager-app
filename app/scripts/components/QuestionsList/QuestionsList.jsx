var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var OnResize = require("react-window-mixins").OnResize;
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var Rating = require('react-rating');

var AppStore = require('../../stores/AppStore');
var UserActions = require("../../actions/UserActions");
var QuestionItem = require('./QuestionItem');

var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var listContainerStyle = {
    width: '100%',
    position: 'relative',
    top: '290px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    overflowY: 'scroll',
    bottom: '0',
    borderRadius: '0px',
};

var itemStyle = {
    listStyle: 'none',
    marginLeft: '0',
    marginBottom: '3px'
};

var listStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
};

var QuestionsList = React.createClass({
    mixins: [OnResize, Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],

     render: function() {
        var windowHeight = this.state.window.height;
        var listHeight = windowHeight - 290;

        listStyle.height = listHeight+"px";
        listStyle.borderRadius = '0px';

        var questions = this.state.appData.questions.unanswered;
        var answered = this.state.appData.questions.answered;
        var dismissed = this.state.appData.questions.dismissed;

        var unansweredList = _.map(questions, function(question) {
            return (
                <li key={question.id} style={itemStyle}>
                    <QuestionItem question={question} rowType={1} />
                </li>
            )
        }.bind(this));

        var answeredList = _.map(answered, function(answer) {
            return (
                <li key={answer.id} style={itemStyle}>
                    <QuestionItem question={answer} rowType={2} />
                </li>
            )
        }.bind(this));

        var dismissedList = _.map(dismissed, function(question) {
            return (
                <li key={question.id} style={itemStyle}>
                    <QuestionItem question={question} rowType={3} />
                </li>
            )
        }.bind(this));

        return (
            <div style={listContainerStyle}>
                <ul style={listStyle}>
                    {unansweredList}
                    {dismissedList}
                    {answeredList}
                </ul>
            </div>
        );
    }
});

module.exports = QuestionsList;
