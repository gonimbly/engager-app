var React = require('react');
var SwipeToRevealOptions = require('./SwipeRow');
var Rating = require('react-rating');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var UserActions = require("../../actions/UserActions");
var AppActions = require("../../actions/AppActions");
var AppStore = require('../../stores/AppStore');

var QuestionItem = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    PropTypes:{
        question: React.PropTypes.object.isRequired,
        rowType: React.PropTypes.number.isRequired
    },

    onRate: function(rate, question) {
        UserActions.increasePoints(question);
        AppActions.answerQuestion(question, this.state.appData.user);
    },

    onDismiss: function(question) {
        AppActions.dismissQuestion(question);
    },

    render: function() {
        var question = this.props.question;
        var rowType = this.props.rowType;

        var bg = "#f8f8fa";
        var text = "#000000";
        var swipe = true;
        var isRightActive = swipe;

        var pointsStyle = {
            height: '80px',
            width: '100%',
            marginLeft: '20px',
            marginRight: '20px',
            right: '0px',
            fontSize: '17px',
            verticalAlign: 'middle',
            color: '#71c04f'
        };

        var okStyle = {
            height: '80px',
            width: '100%',
            marginLeft: '20px',
            marginRight: '20px',
            right: '0px',
            fontSize: '17px',
            verticalAlign: 'middle',
            color: '#71c04f',
        };

        switch (rowType) {
            case 1: // unanswered
                okStyle.display = "none";
            break;
            case 2: // answered
                bg = "#71c04f";
                text = "#FFFFFF";
                swipe = false;
                pointsStyle.display = "none";
                isRightActive = false;
            break;
            case 3: // dismissed
                okStyle.display = "none";
                bg = "#e9e7e7";
                isRightActive = false;
            break;
        }

        var item = {
            leftOptions: [{
                content: null,
                class: 'rate-starts'
            }],
            rightOptions: [{
                content: null,
                class: 'dismiss-button'
            }],
        };

        return (
            <div>
                <SwipeToRevealOptions
                    actionThreshold={300}
                    visibilityThreshold={50}
                    leftOptions={item.leftOptions}
                    rightOptions={item.rightOptions}
                    callActionWhenSwipingFarRight={swipe}
                    callActionWhenSwipingFarLeft={swipe}
                    contentBgColor={bg}
                    isRightActive={swipe}
                    isLeftActive={isRightActive}
                    onRate={this.onRate}
                    onDismiss={this.onDismiss}
                    questionObj={question}>
                    <table>
                        <tr>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    left: '0',
                                    verticalAlign: 'middle',
                                }}>
                                <span style={{color: text, fontSize: '16px'}} className="wordwrap">
                                    {question.text}
                                </span>
                            </td>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    marginTop: '10px',
                                    verticalAlign: 'middle',
                                }}>
                                <span style={pointsStyle} className="text-center">
                                    <label style={{paddingTop: '20px', marginBottom: '0px'}}>{question.points}</label>
                                    <div style={{margin: '0px', lineHeight: '3px', fontSize: '10px'}}>pts</div>
                                </span>
                                <span style={okStyle} className="text-center">
                                    <img src="../../../assets/check.png" width="20px" height="16px"/>
                                </span>
                            </td>
                        </tr>
                    </table>
                </SwipeToRevealOptions>
            </div>
        );
    }
});

module.exports = QuestionItem;
