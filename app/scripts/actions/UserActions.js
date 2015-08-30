var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'increasePoints',
    'getUser',
    'scoreToNormal',
    'signin',
    'signup',
    'onChangeName',
    'onChangeEmail',
    'onChangePassword',
]);

module.exports = UserActions;
