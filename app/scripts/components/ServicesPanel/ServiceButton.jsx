var React = require('react');
var ReactMDL = require('react-mdl');

var Button = ReactMDL.Button;

var buttonStyle = {

};

var ServiceButton = React.createClass({
    PropTypes:{
		serice: React.PropTypes.object.isRequired,
		onClick: React.PropTypes.func.isRequired
	},

    onClick: function(service){
		this.props.onClick(service);
	},

    render: function() {
        var service = this.props.service;

        return (
            <span>
                <Button style={buttonStyle} onClick={this.onClick.bind(this, service)}>
                    <div>{service.name}</div>
                </Button>
            </span>
        );
    }
});

module.exports = ServiceButton;
