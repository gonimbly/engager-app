var React = require('react');
var ReactMDL = require('react-mdl');

var Layout = ReactMDL.Layout;

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
              <img src='../../assets/profile.png' style={imageStyle.image} className="img-rounded" />
          </a>
      </div>
    );
  }
});

module.exports = ProfileImage;
