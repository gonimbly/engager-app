var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../../stores/AppStore');

var addPhotoStyle = {
    width: '110px',
    center: {
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)'
    }
};

var CoverImage = React.createClass({
  mixins: [Reflux.connect(AppStore, 'appData')],
  render: function() {
    var circlePhoto = {
      "background-image": "url('"+this.state.appData.user.picture_url+"')"
    };
    return (
      <div style={addPhotoStyle.center}>
          <div  className="center-block" style={addPhotoStyle}>
            <div className="circle" style={circlePhoto}></div>
          </div>
      </div>
    );
  }
});

module.exports = CoverImage;
