var Reflux = require('reflux');

var ServicesActions = Reflux.createActions([
    'clickOnService',
    'onPopulateQuestions',
    'onSelectService',
    'answerQuestion',
    'dismissQuestion',
]);

module.exports = ServicesActions;
