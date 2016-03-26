var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var OnResize = require('react-window-mixins').OnResize;
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var Rating = require('react-rating');

require('./QuestionsList.scss');

var AppStore = require('../../stores/AppStore');
var UserActions = require('../../actions/UserActions');
var QuestionItem = require('./QuestionItem');

var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var QuestionsList = React.createClass({
    mixins: [OnResize, Router.Navigation,
			 Router.State,
             Reflux.connect(AppStore, 'appData')],
     propTypes: {
        listY: React.PropTypes.number
     },
     style: {
        container: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            overflowY: 'scroll',
            bottom: '0',
            borderRadius: '0px',
            borderTop: '1px solid white'
        },
        list: {
            listStyleType: 'none',
            margin: '0',
            padding: '0'
        },
        listItem: {
            listStyle: 'none',
            marginLeft: '0',
            marginBottom: '3px'
        }
     },
     render: function() {
        var style = this.style;
        var windowHeight = this.state.window.height;
        var container = document.getElementsByClassName('question-list-container');
        if(container && container[0]) {
          style.container.height = (windowHeight - container[0].offsetTop) + 'px';
        }

        var questions = this.state.appData.questions.unanswered;
        var answered = this.state.appData.questions.answered;
        var dismissed = this.state.appData.questions.dismissed;

        var unansweredList = _.map(questions, function(question) {
            // show correct answer state even if it's in the wrong list, to avoid jumping
            var answered = _.has(question, 'rate');
            var rowType = answered ? 2 : 1;
            return (
                <li key={question.id} style={style.listItem}>
                    <QuestionItem question={question} rowType={rowType} />
                </li>
            )
        }.bind(this));

        var answeredList = _.map(answered, function(answer) {
            return (
                <li key={answer.id} style={style.listItem}>
                    <QuestionItem question={answer} rowType={2} />
                </li>
            )
        }.bind(this));

        var dismissedList = _.map(dismissed, function(question) {
            // show correct answer state even if it's in the wrong list, to avoid jumping
            var answered = _.has(question, 'rate');
            var rowType = answered ? 2 : 3;
            return (
                <li key={question.id} style={style.listItem}>
                    <QuestionItem question={question} rowType={3} />
                </li>
            )
        }.bind(this));

        return (
            <div className='question-list-container' style={style.container}>
                <ul style={style.list}>
                    {unansweredList}
                    {dismissedList}
                    {answeredList}
                </ul>
            </div>
        );
    }
});

module.exports = QuestionsList;
