var React = require('react');
var SwipeToRevealOptions = require('./SwipeToRevealOptions');
var Rating = require('react-rating');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');
var emojione = require('emojione');

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

    onEmoji: function(rate, emoji, question) {
        if(!question.emoji) {
            // increase points for first time rating
            UserActions.increasePoints(question);
        }

        question.rate = rate;
        question.emoji = emoji;
        this.setState({
            question: question
        });

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
                bg = '#e9e7e7';
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
        var leftIcons = _.map(icons, function(icon, index) {
            var classes = 'icon';
            var rating = index + 1;
            if(questionItemClass === 'question-answered' && question.emoji === icon) {
                classes += ' active jelly-in';
            }
            emojione.imageType = 'svg';
            var iconImg = emojione.unicodeToImage(icon);
            return (
                <div className={classes}
                     key={index}
                     onClick={this.onEmoji.bind(this, rating, icon, question)}
                     dangerouslySetInnerHTML={{ __html: iconImg }}>
                </div>
            );
        }.bind(this));
        var leftStyle = {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingLeft: '15px',
            paddingRight: '15px'
        };
        var leftChildren = (
            <div style={leftStyle}>
                {leftIcons}
            </div>
        );

        var rightStyle = {
            width: '100%',
            height: '100%'
        };
        var rightChildren = (
            <div className={'stro-button stro-right-button text-center dismiss-button'}
                 onClick={this.onDismiss.bind(this, question)}
                 style={rightStyle}>
                <span>I do not want to answer this right now.</span>
            </div>
        );

        questionItemClass += ' question-item';

        var rightColumn;
        switch (rowType) {
            case 1: // unanswered
            case 3: // dismissed
                rightColumn = (
                    <span className='question-item-points text-center'>
                        <label>{question.points}</label>
                        <div className='points-copy'>pts</div>
                    </span>
                );
            break;
            case 2: // answered
                var rightColumnImg = emojione.unicodeToImage(question.emoji);
                rightColumn = (
                    <span className='feedback icon active'
                          dangerouslySetInnerHTML={{ __html: rightColumnImg }}>
                    </span>
                );
            break;
        }

        return (
            <div className={questionItemClass}>
                <SwipeToRevealOptions actionThreshold={300}
                                      visibilityThreshold={25}
                                      leftChildren={leftChildren}
                                      rightChildren={rightChildren}
                                      callActionWhenSwipingFarRight={swipe}
                                      callActionWhenSwipingFarLeft={swipe}
                                      contentBgColor={bg}
                                      isRightActive={true}
                                      isLeftActive={isRightActive}
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
                                {rightColumn}
                            </td>
                        </tr>
                    </table>
                </SwipeToRevealOptions>
            </div>
        );
    }
});

module.exports = QuestionItem;
