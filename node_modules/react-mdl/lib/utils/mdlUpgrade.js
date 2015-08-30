'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (Component) {
    var MDLUpgradedComponent = (function (_React$Component) {
        _inherits(MDLUpgradedComponent, _React$Component);

        function MDLUpgradedComponent() {
            _classCallCheck(this, MDLUpgradedComponent);

            _React$Component.apply(this, arguments);
        }

        MDLUpgradedComponent.prototype.componentDidMount = function componentDidMount() {
            componentHandler.upgradeElement(_react2['default'].findDOMNode(this));
        };

        MDLUpgradedComponent.prototype.componentWillUnmount = function componentWillUnmount() {
            componentHandler.downgradeElements(_react2['default'].findDOMNode(this));
        };

        MDLUpgradedComponent.prototype.render = function render() {
            return _react2['default'].createElement(Component, this.props);
        };

        return MDLUpgradedComponent;
    })(_react2['default'].Component);

    return MDLUpgradedComponent;
};

module.exports = exports['default'];