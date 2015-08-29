var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'increasePoints',
    'getUser',
    'scoreToNormal'
]);

module.exports = UserActions;
