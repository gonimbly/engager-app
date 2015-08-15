var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var ServiceButton = require("./ServiceButton");

var ServicesActions = require("../../actions/ServicesActions");
var ServicesStore = require('../../stores/ServicesStore');

var panelStyle = {
    backgroundColor: '#111f26',
    width: '100%',
    height: '70px',
    position: 'absolute',
    top: '200px',
    list: {
        width: '100%',
        listStyleType: 'none',
        margin: '0',
        padding: '0',
    },
    item: {
        display: 'inline'
    }
};

var ServicesPanel = React.createClass({
    mixins: [Router.Navigation,
			 Router.State,
             Reflux.connect(ServicesStore, 'servicesData')],

    clickService: function(service) {
        ServicesActions.clickOnService(service);
    },
    render: function() {
        var services = this.state.servicesData;

        var list = _.map(services, function(service){
            return (
                <li style={panelStyle.item}>
                    <ServiceButton onClick={this.clickService} service={service} />
                </li>
            )
        }.bind(this));

        return (
            <div style={panelStyle}>
                <ul style={panelStyle.list}>
                    {list}
                </ul>
            </div>
        );
    }
});

module.exports = ServicesPanel;
