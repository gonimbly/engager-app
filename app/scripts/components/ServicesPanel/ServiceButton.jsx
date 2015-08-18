var React = require('react');
var ReactMDL = require('react-mdl');
var Radium = require('radium');

var Button = ReactMDL.Button;

var ServiceButton = React.createClass({
    PropTypes:{
		service: React.PropTypes.object.isRequired,
		onClick: React.PropTypes.func.isRequired
	},

    onClick: function(service){
		this.props.onClick(service);
	},

    render: function() {
        var service = this.props.service;

        return (
            <span>
                <button className={service.className} onClick={this.onClick.bind(this, service)}>
                    <span><strong>{service.name} {service.price}</strong></span>
                    <br/>
                    <span style={{fontWeight: "200"}}>{service.points}pts</span>
                </button>
            </span>
        );
    }
});

module.exports = Radium(ServiceButton);
