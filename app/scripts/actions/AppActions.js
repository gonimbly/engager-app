var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'clickOnService',
    'onPopulateQuestions',
    'answerQuestion',
    'answerDismissedQuestion',
    'dismissQuestion',
    'updateRewards',
    'updateAnswer',
    'openReward',
    'closeReward',
    'claimReward'
]);

module.exports = AppActions;
