var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'increasePoints',
    'getUser',
    'scoreToNormal',
    'signin',
    'signout',
    'signup',
    'onChangeName',
    'onChangeEmail',
    'onChangePassword',
    'hasNoToken',
]);

module.exports = UserActions;
