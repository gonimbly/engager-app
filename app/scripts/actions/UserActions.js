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
    'hasNoToken',
]);

module.exports = UserActions;
