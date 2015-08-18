var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var OnResize = require("react-window-mixins").OnResize;
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var ServicesStore = require('../../stores/ServicesStore');

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
    backgroundColor: '#f8f8fa',
    listStyle: 'none',
    marginLeft: '0',
    paddingLeft: '1em',
    marginBottom: '3px',
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

        var list = _.map(questions, function(question) {
            return (
                <li key={question.id} style={itemStyle}>
                    <div style={{
                            display: 'table',
                            height: '80px',
                            width: '100%',
                            marginLeft: '10px',
                            textAlign: 'left',
                        }} className="">
                        <span style={{
                                height: '80px',
                                width: '80%',
                                left: '0',
                                display: 'table-cell',
                                verticalAlign: 'middle',
                            }} className="wordwrap">
                            {question.text}
                        </span>
                        <span style={{
                                height: '80px',
                                width: '100%',
                                right: '0px',
                                display: 'table-cell',
                                verticalAlign: 'middle',
                                color: '#71c04f',
                            }} className="text-center">
                            <label style={{marginBottom: '0px'}}>{question.points}</label>
                            <div style={{margin: '0px', lineHeight: '3px', fontSize: '10px'}}>pts</div>
                        </span>
                    </div>
                </li>
            )
        }.bind(this));

        return (
            <div style={listContainerStyle}>
                <ul style={listStyle}>
                    {list}
                </ul>
            </div>
        );
    }
});

module.exports = QuestionsList;
