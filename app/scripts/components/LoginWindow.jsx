var React = require('react');
var ReactMDL = require('react-mdl');
var Router = require('react-router');
var Reflux = require('reflux');
var AppActions = require("../actions/AppActions");
var UserActions = require("../actions/UserActions");
var AppStore = require('../stores/AppStore');
var Cookie = require('react-cookie');

var Textfield = ReactMDL.Textfield;
var Button = ReactMDL.Button;
var Spinner = ReactMDL.Spinner;

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
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#71c04f',
    width: '300px',
    color: '#FFFFFF',
};

var spinnerStyle = {
    marginRight: '50%',
    marginLeft: '45%',
    width: '28px',
    marginBottom: '20px',
    marginTop: '20px',
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

var LoginWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

    onClickSignin: function() {
        UserActions.signin();
    },
    onClickSignup: function() {
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
                <h1 style={titleStyle} className="text-center">Engaged Signin</h1><br/>
                <Textfield
                    onChange={this.onChangeEmail.bind(this)}
                    value={this.state.appData.user.email}
                    label="Enter your email"
                    floatingLabel={true}
                    className="textfield"
                />
                <Textfield
                    onChange={this.onChangePassword.bind(this)}
                    value={this.state.appData.user.password}
                    label="Enter your password"
                    floatingLabel={true}
                    className="textfield"
                /><br/>
            <Button className="text-center" style={buttonStyle} raised={true} ripple={true} onClick={this.onClickSignin.bind(this)}>Signin</Button><br/>
            <p style={orStyle} className="text-center">- or -</p><br/>
            <p style={orStyle} className="text-center">Not a user! Signup now.</p><br/>
            <Button className="text-center" style={signupStyle} raised={true} ripple={true} onClick={this.onClickSignup.bind(this)}>Signup</Button>
            <Spinner style={spinnerStyle} singleColor={true} className={this.state.appData.animations.loaderIcon}/>
            </div>
        );
    }
});

module.exports = LoginWindow;
