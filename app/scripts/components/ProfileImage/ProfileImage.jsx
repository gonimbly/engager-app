var React = require('react');

var imageStyle = {
    marginRight: '10px',
    marginTop: '10px',
    position: 'absolute',
    right: '0',
    image: {
        width: '30px',
    }
};

var ProfileImage = React.createClass({
  render: function() {
    return (
      <div style={imageStyle}>
          <a href="#">
              <img src='../../images/profile.png' style={imageStyle.image} className="img-rounded" />
          </a>
      </div>
    );
  }
});

module.exports = ProfileImage;
