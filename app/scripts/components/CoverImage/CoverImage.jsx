var React = require('react');

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
      <div>
          <div style={addPhotoStyle.center} className="center-block">
              <a href="#">
                  <img src="../../assets/addphoto.png" style={addPhotoStyle} />
              </a>
          </div>
      </div>
    );
  }
});

module.exports = CoverImage;
