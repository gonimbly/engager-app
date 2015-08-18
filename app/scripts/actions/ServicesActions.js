var Reflux = require('reflux');

var ServicesActions = Reflux.createActions([
    'clickOnService',
    'onPopulateQuestions',
    'onSelectService'
]);

module.exports = ServicesActions;
