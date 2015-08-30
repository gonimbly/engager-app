'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Badge = (function (_React$Component) {
    _inherits(Badge, _React$Component);

    function Badge() {
        _classCallCheck(this, Badge);

        _React$Component.apply(this, arguments);
    }

    Badge.prototype.render = function render() {
        var children = this.props.children;

        var element;
        if (typeof children === 'string') {
            element = _react2['default'].createElement(
                'span',
                null,
                children
            );
        } else {
            element = _react2['default'].Children.only(this.props.children);
        }

        return _react2['default'].cloneElement(element, {
            className: 'mdl-badge',
            'data-badge': this.props.text
        });
    };

    _createClass(Badge, null, [{
        key: 'propTypes',
        value: {
            children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]).isRequired,
            text: _react.PropTypes.string.isRequired
        },
        enumerable: true
    }]);

    return Badge;
})(_react2['default'].Component);

exports['default'] = Badge;
module.exports = exports['default'];