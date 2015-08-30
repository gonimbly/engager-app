'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (children, props) {
    return _react2['default'].Children.map(children, function (child) {
        var p = typeof props === 'function' ? props(child) : props;
        return _react2['default'].cloneElement(child, p);
    });
};

module.exports = exports['default'];