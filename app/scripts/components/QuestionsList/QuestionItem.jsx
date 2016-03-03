var React = require('react');
var SwipeToRevealOptions = require('./SwipeToRevealOptions');
var Rating = require('react-rating');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var UserActions = require('../../actions/UserActions');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var checkImage = require('../../../images/check.png');

require('./QuestionItem.scss');

var QuestionItem = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    PropTypes:{
        question: React.PropTypes.object.isRequired,
        rowType: React.PropTypes.number.isRequired
    },

    onRate: function(rate, question) {
        if(!question.rate) {
            // increase points for first time rating
            UserActions.increasePoints(question);
        }

        question.rate = rate;

        // input delay to show user their action
        setTimeout(function() {
            switch (this.props.rowType) {
                case 1:
                    AppActions.answerQuestion(question, this.state.appData.user);
                break;
                case 2:
                    AppActions.updateAnswer(question, this.state.appData.user);
                break;
                case 3:
                    AppActions.answerDismissedQuestion(question, this.state.appData.user);
                break;
                default :
                    console.log('Unhandled row type:', this.props.rowType);
            }
        }.bind(this), 1000);
    },

    onDismiss: function(question) {
        console.log('onDismiss');
        AppActions.dismissQuestion(question);
    },

    render: function() {
        var question = this.props.question;
        var rowType = this.props.rowType;

        var bg = '#F8F8FA';
        var swipe = true;
        var isRightActive = swipe;

        var questionItemClass;
        switch (rowType) {
            case 1: // unanswered
                questionItemClass = 'question-unanswered';

            break;
            case 2: // answered
                questionItemClass = 'question-answered';
                bg = '#B0D579';
                swipe = false;
                isRightActive = false;
            break;
            case 3: // dismissed
                questionItemClass = 'question-dismissed';
                bg = '#e9e7e7';
                isRightActive = false;
            break;
        }

        var icons = ['😡','😕','🙂','😃','😍'];
        var leftChildren = _.map(icons, function(icon, index) {
            var classes = 'icon';
            return (
                <a className={classes}
                   key={index}>
                  {icon}
                </a>
            );
        });
        var rightChildren = (
            <div className={'stro-button stro-right-button text-center dismiss-button'}
                 onClick={this.onDismiss.bind(this, question)}>
                <span dangerouslySetInnerHTML={{ __html: "Dismiss" }}></span>
            </div>
        );

        var leftOptions = {
            width: 220
        }
        var rightOptions = {
            width: 100
        }

        questionItemClass += ' question-item';

        return (
            <div className={questionItemClass}>
                <SwipeToRevealOptions actionThreshold={300}
                                      visibilityThreshold={25}
                                      leftOptions={leftOptions}
                                      rightOptions={rightOptions}
                                      leftChildren={leftChildren}
                                      rightChildren={rightChildren}
                                      callActionWhenSwipingFarRight={swipe}
                                      callActionWhenSwipingFarLeft={swipe}
                                      contentBgColor={bg}
                                      isRightActive={true}
                                      isLeftActive={isRightActive}
                                      onRate={this.onRate}
                                      questionObj={question}
                                      collapseDelay={900}>
                    <table>
                        <tr>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    left: '0',
                                    verticalAlign: 'middle',
                                }}>
                                <span className='question-item-text wordwrap'>
                                    {question.text}?
                                </span>
                            </td>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    marginTop: '10px',
                                    verticalAlign: 'middle',
                                }}>
                                <span className='question-item-points text-center'>
                                    <label>{question.points}</label>
                                    <div className='points-copy'>pts</div>
                                </span>
                                <span className='question-item-check text-center'>
                                    <img src={checkImage} width='20px' height='16px'/>
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
