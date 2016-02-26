var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');
var UserActions = require("../../actions/UserActions");

var CoverImage = React.createClass({
  mixins: [Reflux.connect(AppStore, 'appData')],
  style: {
    container: {
      marginBottom: '10px'
    },
    image: {
      width: '100px',
      height: '100px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  render: function() {
    var circlePhoto = {
      backgroundImage: 'url("' + this.state.appData.user.picture_url + '")'
    };
    return (
      <div style={this.style.container}>
          <div  style={this.style.image}>
            <div className='circle' style={circlePhoto} onClick={UserActions.signout}></div>
          </div>
      </div>
    );
  }
});

module.exports = CoverImage;
