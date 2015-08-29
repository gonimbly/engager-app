var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'clickOnService',
    'onPopulateQuestions',
    'answerQuestion',
    'dismissQuestion',
    'updateRewards',
    'openReward',
    'closeReward',
    'claimReward'
]);

module.exports = AppActions;
