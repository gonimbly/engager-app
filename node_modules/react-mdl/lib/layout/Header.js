'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderRow = require('./HeaderRow');

var _HeaderRow2 = _interopRequireDefault(_HeaderRow);

var _HeaderTabs = require('./HeaderTabs');

var _HeaderTabs2 = _interopRequireDefault(_HeaderTabs);

var Header = (function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        _React$Component.apply(this, arguments);
    }

    Header.prototype.render = function render() {
        var _props = this.props;
        var className = _props.className;
        var scroll = _props.scroll;
        var title = _props.title;
        var transparent = _props.transparent;
        var waterfall = _props.waterfall;

        var otherProps = _objectWithoutProperties(_props, ['className', 'scroll', 'title', 'transparent', 'waterfall']);

        var classes = _classnames2['default']('mdl-layout__header', {
            'mdl-layout__header--scroll': scroll,
            'mdl-layout__header--transparent': transparent,
            'mdl-layout__header--waterfall': waterfall
        }, className);

        var isRowOrTab = false;
        _react2['default'].Children.forEach(this.props.children, function (child) {
            if (child.type === _HeaderRow2['default'] || child.type === _HeaderTabs2['default']) {
                isRowOrTab = true;
            }
        });

        return _react2['default'].createElement(
            'header',
            _extends({ className: classes }, otherProps),
            isRowOrTab ? this.props.children : _react2['default'].createElement(
                _HeaderRow2['default'],
                { title: title },
                this.props.children
            )
        );
    };

    _createClass(Header, null, [{
        key: 'propTypes',
        value: {
            className: _react.PropTypes.string,
            scroll: _react.PropTypes.bool,
            title: _react.PropTypes.string,
            transparent: _react.PropTypes.bool,
            waterfall: _react.PropTypes.bool
        },
        enumerable: true
    }]);

    return Header;
})(_react2['default'].Component);

exports['default'] = Header;
module.exports = exports['default'];