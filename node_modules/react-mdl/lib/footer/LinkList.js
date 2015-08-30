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

var LinkList = (function (_React$Component) {
    _inherits(LinkList, _React$Component);

    function LinkList() {
        _classCallCheck(this, LinkList);

        _React$Component.apply(this, arguments);
    }

    LinkList.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var className = _props.className;
        var size = _props.size;
        var title = _props.title;

        var otherProps = _objectWithoutProperties(_props, ['className', 'size', 'title']);

        var classes = _classnames2['default']((_classNames = {}, _classNames['mdl-' + size + '-footer__link-list'] = true, _classNames), className);

        return _react2['default'].createElement(
            'ul',
            _extends({ className: classes }, otherProps),
            _react2['default'].Children.map(this.props.children, function (child) {
                return _react2['default'].createElement(
                    'li',
                    null,
                    child
                );
            })
        );
    };

    _createClass(LinkList, null, [{
        key: 'propTypes',
        value: {
            className: _react.PropTypes.string,
            size: _react.PropTypes.oneOf(['mini', 'mega']),
            title: _react.PropTypes.string
        },
        enumerable: true
    }]);

    return LinkList;
})(_react2['default'].Component);

exports['default'] = LinkList;
module.exports = exports['default'];