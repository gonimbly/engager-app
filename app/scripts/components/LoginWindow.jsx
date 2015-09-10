var React = require('react');
var ReactMDL = require('react-mdl');
var Router = require('react-router');
var Reflux = require('reflux');
var AppActions = require("../actions/AppActions");
var UserActions = require("../actions/UserActions");
var AppStore = require('../stores/AppStore');
var Cookie = require('react-cookie');
var Spinner = require('react-spinkit');

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
    marginBottom: '20px',
    color: '#71c04f',
};

var buttonStyle = {
    marginTop: '30px',
    marginBottom: '10px',
    backgroundColor: '#71c04f',
    width: '300px',
    color: '#FFFFFF',
};

var spinnerStyle = {
    width: 'auto',
    marginBottom: '20px',
    marginTop: '20px',
};

var signupStyle = {
    marginBottom: '10px',
    backgroundColor: '#1c1c1c',
    width: '300px',
    color: '#FFFFFF',
};

var orStyle = {
    color: 'gray',
    lineHeight: '30px'
};

var LoginWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    onClickSignin: function() {
        UserActions.signin();
    },
    onClickSignup: function() {
        AppStore.setErrorMessage("");
        window.location = "/#/signup";
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
                <h1 style={titleStyle} className="text-center">Engager Log In</h1><br/>
                <Textfield
                    onChange={this.onChangeEmail.bind(this)}
                    value={this.state.appData.user.email}
                    label="Enter your email"
                    floatingLabel={true}
                    className="textfield"
                /><br/>
                <Textfield
                    onChange={this.onChangePassword.bind(this)}
                    value={this.state.appData.user.password}
                    label="Enter your password"
                    floatingLabel={true}
                    className="textfield"
                    type="password"
                /><br/>
            <span className="signin-error-message text-center">{this.state.appData.errorMessages.signin.msg}</span>
            <Button className="text-center" style={buttonStyle} raised={true} ripple={true} onClick={this.onClickSignin.bind(this)}>Log In</Button><br/>
            <p style={orStyle} className="text-center">- or -</p>
            <Button className="text-center" style={signupStyle} raised={true} ripple={true} onClick={this.onClickSignup.bind(this)}>Not a user! Register now</Button>
            <Spinner style={spinnerStyle} spinnerName='three-bounce' className={this.state.appData.animations.loaderIcon}/>
            </div>
        );
    }
});

module.exports = LoginWindow;
