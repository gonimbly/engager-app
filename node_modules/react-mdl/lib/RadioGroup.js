'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _utilsCloneChildren = require('./utils/cloneChildren');

var _utilsCloneChildren2 = _interopRequireDefault(_utilsCloneChildren);

var RadioGroup = (function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup() {
        var _this = this;

        _classCallCheck(this, RadioGroup);

        _React$Component.apply(this, arguments);

        this._handleChange = function (value) {
            _this.props.onChange(value);
        };
    }

    RadioGroup.prototype.render = function render() {
        var _this2 = this;

        return _react2['default'].createElement(
            'div',
            null,
            _utilsCloneChildren2['default'](this.props.children, function (child) {
                return {
                    name: _this2.props.name,
                    checked: child.props.value === _this2.props.value,
                    onChange: _this2._handleChange
                };
            })
        );
    };

    _createClass(RadioGroup, null, [{
        key: 'propTypes',
        value: {
            children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
                var prop = props[propName];
                if (prop.type !== _Radio2['default']) {
                    return new Error('`' + componentName + '` only accepts `Radio` as children.');
                }
            }),
            name: _react.PropTypes.string.isRequired,
            onChange: _react.PropTypes.func.isRequired,
            value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
        },
        enumerable: true
    }]);

    return RadioGroup;
})(_react2['default'].Component);

exports['default'] = RadioGroup;
module.exports = exports['default'];