var Reflux = require('reflux');

var ServicesActions = Reflux.createActions([
    'clickOnService',
    'onPopulateQuestions',
    'onSelectService',
    'answerQuestion',
    'dismissQuestion',
    'updateRewards',
    'openReward',
    'closeReward',
]);

module.exports = ServicesActions;
