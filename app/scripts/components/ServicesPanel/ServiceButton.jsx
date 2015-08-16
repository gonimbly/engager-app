var React = require('react');
var ReactMDL = require('react-mdl');
var Radium = require('radium');

var Button = ReactMDL.Button;

var buttonStyle = {
    base: {
        width: '100px',
        height: '55px',
        backgroundColor: 'transparent',
        border: '1px solid #2fb9fe',
        color: '#2fb9fe',
        margin: '12px 8px',
        lineHeight: '16px',
        textAlign: 'left',
        textTransform: 'none',
    },
    selected: {
        width: '100px',
        height: '55px',
        border: '1px solid #2fb9fe',
        margin: '12px 8px',
        lineHeight: '16px',
        textAlign: 'left',
        textTransform: 'none',
        backgroundColor: '#2fb9fe',
        color: '#ffffff',
        outline: '0',
    }
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
                <button className={service.className} onClick={this.onClick.bind(this, service)}>
                    <span>{service.name} {service.price}</span>
                    <br/>
                    <span>{service.points}pts</span>
                </button>
            </span>
        );
    }
});

module.exports = Radium(ServiceButton);
