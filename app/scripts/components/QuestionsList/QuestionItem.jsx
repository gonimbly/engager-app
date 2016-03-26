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

require('./QuestionItem.scss');

var QuestionItem = React.createClass({
  mixins: [Router.Navigation,
       Router.State],

  PropTypes:{
    question: React.PropTypes.object.isRequired,
    rowType: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      question: this.props.question
    };
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
    switch (this.props.rowType) {
      case 1:
        AppActions.answerQuestion(question);
      break;
      case 2:
        AppActions.updateAnswer(question);
      break;
      case 3:
        AppActions.answerDismissedQuestion(question);
      break;
      default :
        console.log('Unhandled row type:', this.props.rowType);
    }
    console.log('onEmoji complete');
  },

  onDismiss: function(question) {
    AppActions.dismissQuestion(question);
  },

  render: function() {
    var style = {
      leftColumn: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: '15px',
        paddingRight: '15px'
      },
      middleColumn: {
        height: '80px',
        display: 'flex',
        alignItems: 'center'
      },
      middleColumnQuestion: {
        color: '#3B3B3C',
        fontSize: '16px',
        fontWeight: '200',
        width: '80%',
        paddingLeft: '20px',
        lineHeight: '20px'
      },
      middleColumnInfo: {
        width: '20%',
        lineHeight: '15px'
      },
      rightColumn: {
        width: '100%',
        height: '100%'
      }
    };
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
        style.middleColumnQuestion.color = '#1E1E1E';
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
      if(question.emoji === icon) {
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
    var leftChildren = (
      <div style={style.leftColumn}>
        {leftIcons}
      </div>
    );

    var rightChildren = (
      <div className={'stro-button stro-right-button text-center dismiss-button'}
         onClick={this.onDismiss.bind(this, question)}
         style={style.rightColumn}>
        <span>I do not want to answer this right now.</span>
      </div>
    );

    questionItemClass += ' question-item';

    var middleColumnInfo;
    switch (rowType) {
      case 1: // unanswered
      case 3: // dismissed
        middleColumnInfo = (
          <div className='question-item-points text-center' style={style.middleColumnInfo}>
            {question.points}<br/>
            <span className='points-copy'>pts</span>
          </div>
        );
      break;
      case 2: // answered
        var middleColumnInfoImg = emojione.unicodeToImage(question.emoji);
        middleColumnInfo = (
          <span className='feedback icon active'
                style={style.middleColumnInfo}
                dangerouslySetInnerHTML={{ __html: middleColumnInfoImg }}>
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
          <div style={style.middleColumn}>
            <div className='question-item-text wordwrap'
                  style={style.middleColumnQuestion}>
              {question.text}?
            </div>
            {middleColumnInfo}
          </div>
        </SwipeToRevealOptions>
      </div>
    );
  }
});

module.exports = QuestionItem;
