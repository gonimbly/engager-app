var React = require('react');
var ReactMDL = require('react-mdl');
var Router = require('react-router');
var Reflux = require('reflux');
var AppActions = require("../actions/AppActions");
var UserActions = require("../actions/UserActions");
var AppStore = require('../stores/AppStore');

var Textfield = ReactMDL.Textfield;
var Button = ReactMDL.Button;

var loginStyle = {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    height: '100%',
};

var titleStyle = {
    marginRight: '20px',
    marginLeft: '20px',
    marginTop: '40px',
    marginBottom: '40px',
    color: '#71c04f',
};

var buttonStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#71c04f',
    width: '300px',
    color: '#FFFFFF',
};

var signupStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#1c1c1c',
    width: '300px',
    color: '#FFFFFF',
};

var orStyle = {
    color: 'gray',
};

function linkToState(target, property) {
    return value => {
        target.setState({
            [property]: value
        });
    };
}

var RegisterWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

     onClickSignin: function() {
         window.location = "/#/signin";
     },
     onClickSignup: function() {
         UserActions.signup();
     },
     onChangeName: function(value) {
         UserActions.onChangeName(value);
     },
     onChangeEmail: function(value) {
         UserActions.onChangeEmail(value);
     },
     onChangePassword: function(value) {
         UserActions.onChangePassword(value);
     },
     render: function() {
         return (
            <div style={loginStyle} className="text-center">
                <h1 style={titleStyle} className="text-center">Engaged Signup</h1>
                    <Textfield
                        onChange={this.onChangeName.bind(this)}
                        value={this.state.appData.user.name}
                        label="Enter your full name"
                        floatingLabel={true}
                        className="textfield">
                    </Textfield>
                    <Textfield
                        onChange={this.onChangeEmail.bind(this)}
                        value={this.state.appData.user.email}
                        label="Enter your email"
                        floatingLabel={true}
                        className="textfield">
                    </Textfield>
                    <Textfield
                        onChange={this.onChangePassword.bind(this)}
                        value={this.state.appData.user.password}
                        label="Enter your password"
                        floatingLabel={true}
                        className="textfield">
                    </Textfield>
                <Button className="text-center" style={buttonStyle} raised={true} ripple={true} onClick={this.onClickSignup.bind(this)}>Signup</Button>
                <p style={orStyle} className="text-center">- or -</p>
                <p style={orStyle} className="text-center">Already a user! Signin now.</p>
                <Button className="text-center" style={signupStyle} raised={true} ripple={true} onClick={this.onClickSignin.bind(this)}>Signin</Button>
            </div>
        );
    }
});

module.exports = RegisterWindow;
