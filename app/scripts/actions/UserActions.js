var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'increasePoints',
    'getUser'
]);

module.exports = UserActions;
