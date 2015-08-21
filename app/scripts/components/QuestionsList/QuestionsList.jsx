var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var OnResize = require("react-window-mixins").OnResize;
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var Rating = require('react-rating');

var ServicesStore = require('../../stores/ServicesStore');
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
             Reflux.connect(ServicesStore, 'servicesData')],

     render: function() {
        var windowHeight = this.state.window.height;
        var listHeight = windowHeight - 290;

        listStyle.height = listHeight+"px";
        listStyle.borderRadius = '0px';

        var questions = this.state.servicesData.lastSelection.questions;
        var answered = this.state.servicesData.lastSelection.answered;

        var list = _.map(questions, function(question) {
            return (
                <li key={question.id} style={itemStyle}>
                    <QuestionItem question={question} isAnswered={false} onClick={this.onClickQuestion} />
                </li>
            )
        }.bind(this));

        var answeredList = _.map(answered, function(answer) {
            return (
                <li key={answer.id} style={itemStyle}>
                    <QuestionItem question={answer} isAnswered={true} onClick={this.onClickQuestion} />
                </li>
            )
        }.bind(this));

        return (
            <div style={listContainerStyle}>
                <ul style={listStyle}>
                    {list}
                    {answeredList}
                </ul>
            </div>
        );
    }
});

module.exports = QuestionsList;
