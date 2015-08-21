var React = require('react');
var SwipeToRevealOptions = require('./SwipeRow');
var Rating = require('react-rating');

var UserActions = require("../../actions/UserActions");
var ServicesActions = require("../../actions/ServicesActions");

var QuestionItem = React.createClass({
    PropTypes:{
        question: React.PropTypes.object.isRequired,
        isAnswered: React.PropTypes.bool.isRequired
    },

    onRate: function(rate, question) {
        UserActions.increasePoints(question);
        ServicesActions.answerQuestion(question);
    },

    onDismiss: function(question) {
        ServicesActions.dismissQuestion(question);
    },

    render: function() {
        var question = this.props.question;
        var isAnswered = this.props.isAnswered;

        var bg = "#f8f8fa";
        var text = "#000000";
        var swipe = true;

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

        if (isAnswered) {
            bg = "#71c04f";
            text = "#FFFFFF";
            swipe = false;
            pointsStyle.display = "none";
        }
        else {
            okStyle.display = "none";
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
                    isLeftActive={swipe}
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
