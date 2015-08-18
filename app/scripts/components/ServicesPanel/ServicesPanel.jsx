var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var ServiceButton = require("./ServiceButton");

var ScrollbarWrapper = require('react-scrollbars').ScrollbarWrapper;
var ServicesActions = require("../../actions/ServicesActions");
var ServicesStore = require('../../stores/ServicesStore');

var panelStyle = {
    backgroundColor: '#14200f',
    height: '80px',
    width: '100%',
    position: 'absolute',
    top: '200px',
    whiteSpace: 'nowrap',
    list: {
        overflowX: 'scroll',
        width: 'auto',
        listStyleType: 'none',
        margin: '0',
        padding: '0'
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
        var services = this.state.servicesData.services;

        var list = _.map(services, function(service){
            return (
                <li key={service.id} style={panelStyle.item}>
                    <ServiceButton  onClick={this.clickService} service={service} />
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
