var React = require('react');
var ReactMDL = require('react-mdl');
var Router = require('react-router');
var Reflux = require('reflux');
var AppActions = require("../actions/AppActions");
var UserActions = require("../actions/UserActions");
var AppStore = require('../stores/AppStore');
var Cookie = require('react-cookie');
var Spinner = require('react-spinkit');
var engagerLogo = require('../../images/ENGAGER_BANNER_600.svg');

var Textfield = ReactMDL.Textfield;
var Button = ReactMDL.Button;

var registerStyle = {
    backgroundColor: '#FFFFFF',
    paddingLeft: '40px',
    paddingRight: '40px',
    maxWidth: '400px',
    margin: '0 auto'
};

var logoContainerStyle = {
    textAlign: 'center',
    paddingTop: '25px',
    paddingBottom: '25px'
};

var logoStyle = {
    width: '100%'
};

var titleStyle = {
    marginRight: '20px',
    marginLeft: '20px',
    marginTop: '40px',
    marginBottom: '40px',
    color: '#71c04f',
};

var buttonStyle = {
    marginTop: '30px',
    marginBottom: '10px',
    backgroundColor: '#71c04f',
    width: '100%',
    color: '#FFFFFF',
};

var spinnerStyle = {
    width: 'auto',
    marginBottom: '20px',
    marginTop: '20px',
};

var loginStyle = {
    marginBottom: '10px',
    backgroundColor: '#1c1c1c',
    width: '100%',
    color: '#FFFFFF',
};

var orStyle = {
    color: 'gray',
    lineHeight: '30px'
};

var RegisterWindow = React.createClass({
    mixins: [Router.Navigation,
             Router.State,
             Reflux.connect(AppStore, 'appData')],

     onClickSignin: function() {
         AppStore.setErrorMessage("");
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
            <div style={registerStyle} className="text-center">
                <div style={logoContainerStyle}>
                    <img src={engagerLogo} alt='Engager' style={logoStyle}/>
                </div>
                <Textfield
                    onChange={this.onChangeName.bind(this)}
                    value={this.state.appData.user.name}
                    label="Enter your full name"
                    floatingLabel={true}
                    className="textfield">
                </Textfield><br/>
                <Textfield
                    onChange={this.onChangeEmail.bind(this)}
                    value={this.state.appData.user.email}
                    label="Enter your email"
                    floatingLabel={true}
                    className="textfield">
                </Textfield><br/>
                <Textfield
                    onChange={this.onChangePassword.bind(this)}
                    value={this.state.appData.user.password}
                    label="Enter your password"
                    floatingLabel={true}
                    className="textfield"
                    type="password">
                </Textfield><br/>
                <span className="signup-error-message text-center">{this.state.appData.errorMessages.signin.msg}</span>
                <Button className="text-center" style={buttonStyle} raised={true} ripple={true} onClick={this.onClickSignup.bind(this)}>Register</Button>
                <p style={orStyle} className="text-center">- or -</p>
                <Button className="text-center" style={loginStyle} raised={true} ripple={true} onClick={this.onClickSignin.bind(this)}>Already a user! Log In now</Button>
                <Spinner style={spinnerStyle} spinnerName='three-bounce' className={this.state.appData.animations.loaderIcon}/>
            </div>
        );
    }
});

module.exports = RegisterWindow;
