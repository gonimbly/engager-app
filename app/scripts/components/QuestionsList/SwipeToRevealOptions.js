var React = require('react');
var Rating = require('react-rating');
var Swipeable = require('./Swipeable');

var SwipeToRevealOptions = React.createClass({
  displayName: "SwipeToRevealOptions",

  propTypes: {
    leftChildren: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.array
    ]).isRequired,
    rightChildren: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.array
    ]).isRequired,
    className: React.PropTypes.string,
    actionThreshold: React.PropTypes.number,
    visibilityThreshold: React.PropTypes.number,
    transitionBackTimeout: React.PropTypes.number,
    callActionWhenSwipingFarLeft: React.PropTypes.bool,
    callActionWhenSwipingFarRight: React.PropTypes.bool,
    closeOthers: React.PropTypes.func,
    onRightClick: React.PropTypes.func,
    onLeftClick: React.PropTypes.func,
    onReveal: React.PropTypes.func,
    maxItemWidth: React.PropTypes.number,
    parentWidth: React.PropTypes.number,
    contentBgColor: React.PropTypes.string,
    isLeftActive: React.PropTypes.bool,
    isRightActive: React.PropTypes.bool,
    collapseDelay: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      delta: 0,
      showRightButtons: false,
      showLeftButtons: false,
      swipingLeft: false,
      swipingRight: false,
      transitionBack: false,
      action: null,
      callActionWhenSwipingFarRight: false,
      callActionWhenSwipingFarLeft: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rightChildren: [],
      leftChildren: [],
      className: "",
      actionThreshold: 300,
      visibilityThreshold: 0,
      transitionBackTimeout: 400,
      onRightClick: function onRightClick() {},
      onLeftClick: function onLeftClick() {},
      onReveal: function onReveal() {},
      closeOthers: function closeOthers() {},
      maxItemWidth: window.screen.width,
      parentWidth: window.outerWidth || screen.width
    };
  },

  optionClicked: function() {
      setTimeout(this.transitionBack, this.props.collapseDelay);
  },

  render: function render() {
    var classes = this.props.className + " stro-swipe-container";

    if (this.state.transitionBack) {
        classes += " transition-back";
    }

    if (this.state.showRightButtons) {
        classes += " show-right-buttons";
    }

    if (this.state.showLeftButtons) {
        classes += " show-left-buttons";
    }

    var screenWidth = window.screen.width;
    var leftStyle = {};
    var rightStyle = {};
    if(this.state.showLeftButtons) {
      leftStyle.opacity = 1;
      leftStyle.pointerEvents = 'all';
      
      rightStyle.opacity = 0;
      rightStyle.pointerEvents = 'none';
    } else if(this.state.showRightButtons) {
      leftStyle.opacity = 0;
      leftStyle.pointerEvents = 'none';

      rightStyle.opacity = 1;
      rightStyle.pointerEvents = 'all';
    } else {
      leftStyle.opacity = this.state.delta / screenWidth;
      leftStyle.pointerEvents = 'none';
      
      rightStyle.opacity = -this.state.delta / screenWidth;
      rightStyle.pointerEvents = 'none';
    }

    return (
      <div className='stro-container'>
        <Swipeable onSwipingLeft={this.swipingLeft}
                   onSwipingRight={this.swipingRight}
                   delta={15}
                   onSwiped={this.swiped}>
          <div className='stro-left'
               style={leftStyle}
               onClick={this.optionClicked}>
              {this.props.leftChildren}
          </div>
          <div className="stro-right"
               style={rightStyle}
               onClick={this.optionClicked}>
              {this.props.rightChildren}
          </div>
          <div className={classes}
               style={this.getContainerStyle()}>
               <div className="stro-content"
                    style={{backgroundColor: this.props.contentBgColor}}>
                  {this.props.children}
              </div>
          </div>
        </Swipeable>
      </div>
    );
  },

  swipingLeft: function swipingLeft(event, delta) {
    console.log('swipingLeft');
      if (this.swipingHandleStylesAndDelta(delta, "left")) {
          return;
      }

      var action = null;
      if (delta > this.props.visibilityThreshold) {
          action = "rightVisible";
      }

      if (!this.props.isLeftActive) {
          return;
      }

      if (this.props.callActionWhenSwipingFarLeft && delta > this.props.actionThreshold) {
          action = "rightAction";
      }

      this.setState({
          delta: -delta,
          action: action,
          swipingLeft: true
      });
  },

  swipingRight: function swipingRight(event, delta) {
    console.log('swipingRight');
      if (this.swipingHandleStylesAndDelta(delta, "right")) {
          return;
      }

      var action = null;
      if (delta > this.props.visibilityThreshold) {
          action = "leftVisible";
      }

      if (!this.props.isRightActive) {
          return;
      }

      if (this.props.callActionWhenSwipingFarRight && delta > this.props.actionThreshold) {
          action = "leftAction";
      }

      this.setState({
          delta: delta,
          action: action,
          swipingRight: true
      });
  },

  swipingHandleStylesAndDelta: function swipingHandleStylesAndDelta(delta, direction) {
      if (this.shouldAbort(direction)) {
          return true;
      }

      this.shouldTransitionBack(direction);
      this.shouldCloseOthers(direction);

      return false;
  },

  shouldAbort: function shouldAbort(direction) {
      if (this.state.transitionBack) {
          return true;
      }
  },

  shouldTransitionBack: function shouldTransitionBack(direction) {
      if (direction === "right" && this.state.showRightButtons || this.state.showLeftButtons) {
          this.transitionBack();
      }
  },

  shouldCloseOthers: function shouldCloseOthers(direction) {
      if (this.props.closeOthers) {
          if (direction === "right" && !this.state.swipingRight || !this.state.swipingLeft) {
              this.props.closeOthers();
          }
      }
  },

  swiped: function swiped() {
    switch (this.state.action) {
      case "rightVisible":
        this.props.onReveal("right");
        this.setState({ showRightButtons: true });
        break;
      case "leftVisible":
        // set the rating
        this.props.onReveal("left");
        this.setState({ showLeftButtons: true });
        break;
    }
    this.setState({
      delta: 0,
      action: null,
      swipingLeft: false,
      swipingRight: false,
      secondarySwipe: false,
      transitionBack: true
    });
    setTimeout((function () {
      this.setState({ transitionBack: false });
    }).bind(this), this.props.transitionBackTimeout);
  },

  rightClick: function rightClick(option) {
      this.props.onRightClick(option);
      this.transitionBack();
  },

  leftClick: function leftClick(option) {
      this.props.onLeftClick(option);
      this.transitionBack();
  },

  close: function close() {
      this.transitionBack();
  },

  transitionBack: function transitionBack() {
    console.log('this.transitionBack');
      this.setState({
          showLeftButtons: false,
          showRightButtons: false,
          transitionBack: true
      });
      setTimeout((function () {
          this.setState({ transitionBack: false });
      }).bind(this), this.props.transitionBackTimeout);
  },

  getContainerStyle: function getContainerStyle() {
    var itemWidth;
    var delta = this.state.delta;
    var screenWidth = window.screen.width;
    if (this.state.delta === 0 && this.state.showRightButtons) {
      itemWidth = this.getItemWidth("right");
      delta = -screenWidth;
    } else if (this.state.delta === 0 && this.state.showLeftButtons) {
      itemWidth = this.getItemWidth("left");
      delta = screenWidth;
    } else if(delta > this.props.visibilityThreshold && !this.state.showLeftButtons) {
      // swiping right
      // limit distance container can travel
      delta = Math.min(delta, this.props.maxItemWidth);
    } else if(delta < -this.props.visibilityThreshold && !this.state.showRightButtons) {
      //swiping left
      // limit distance container can travel
      delta = Math.max(delta, -this.props.maxItemWidth);
    }
    return translateStyle(delta, "px");
  },

  getItemWidth: function getItemWidth(side) {
    return Math.min(this.props.parentWidth / (window.screen.width + 1), this.props.maxItemWidth);
  }
});

function translateStyle(x, measure, y) {
  var _y = y || "0";
  return {
    transform: "translate3d(" + x + measure + ", " + _y + ", 0)",
    WebkitTransform: "translate3d(" + x + measure + ", " + _y + ", 0)"
  };
}

module.exports = SwipeToRevealOptions;