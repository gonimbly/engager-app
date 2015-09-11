var React = require('react');

var circlePhoto = {
  "background-image": "url('https://randomuser.me/api/portraits/med/women/17.jpg')"
};

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
  render: function() {
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
