var Reflux = require('reflux');
var _ = require('lodash');
var Cookie = require('react-cookie');
var Promise = require('bluebird');
var firstBy = require('thenby');

var AppActions = require("../actions/AppActions");
var UserActions = require('../actions/UserActions')

// REST calls
var signinURL = '/api/auth/login';
var signupURL = '/api/auth/signup';
var getUserURL = '/api/users';
var getRewardsURL = '/api/rewards';

var AppStore = Reflux.createStore({
    appData: {
        user: {
            added: "",
            email: "",
            first: "",
            fullName: "",
            id: "-1",
            isSignin: false,
            last: "",
            password: "",
            picture_url: "",
            rewards: [],
            score: 0,
            token: ""
        },
        questions: {
            unanswered: [],
            answered: [],
            dismissed:[]
        },
        isRewardOpen: false,
        selectedReward: {},
        redeemedReward: null,
        rewards: [],
        loadingInfo: "show",
        animations: {
            scoreboxScoreAnim: "scorebox-score",
            scoreboxPtsAnim: "scorebox-text",
            scoreboxAddedAnim: "scorebox-points",
            rewardToolbarAnim: "reward-toolbar",
            loaderIcon: "hide"
        },
        errorMessages: {
            signin: {
                msg: ""
            }
        }
    },
    init: function() {
        // check that the user has active token
        this.onLoadToken();

        // sort the list.
        this.activeRewards();

        this.listenTo(AppActions.clickOnService, this.onClickReward);
        this.listenTo(AppActions.answerQuestion, this.onAnswerQuestion);
        this.listenTo(AppActions.answerDismissedQuestion, this.onAnswerDismissedQuestion);
        this.listenTo(AppActions.dismissQuestion, this.onDismissQuestion);
        this.listenTo(AppActions.updateRewards, this.activeRewards);
        this.listenTo(AppActions.updateAnswer, this.updateAnswer);
        this.listenTo(AppActions.openReward, this.openReward);
        this.listenTo(AppActions.claimReward, this.claimReward);
        this.listenTo(AppActions.closeReward, this.closeReward);
        this.listenTo(UserActions.increasePoints, this.onReceiveScore);
        this.listenTo(UserActions.scoreToNormal, this.onScoreReturnToNormal);

        this.listenTo(UserActions.signin, this.onSignin);
        this.listenTo(UserActions.signout, this.onSignout);
        this.listenTo(UserActions.signup, this.onSignup);
        this.listenTo(UserActions.onChangeName, this.onChangeName);
        this.listenTo(UserActions.onChangeEmail, this.onChangeEmail);
        this.listenTo(UserActions.onChangePassword, this.onChangePassword);
        this.listenTo(UserActions.hasNoToken, this.onHasNoToken);
    },
    getInitialState: function(){
        return this.appData;
    },
    onSignout: function() {
        this.onHasNoToken();
    },
    onSignin: function() {
        var email = this.appData.user.email;
        var password = this.appData.user.password;

        this.setErrorMessage("");
        this.trigger(this.appData);

        // validate values
        if (!/([^\s])/.test(email)) {
            this.setErrorMessage("Email cannot be empty!");
            this.trigger(this.appData);
            return;
        }

        if (!/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email)) {
            this.setErrorMessage("Email must be email format!");
            this.trigger(this.appData);
            return;
        }

        if (!/([^\s])/.test(password)) {
            this.setErrorMessage("Password cannot be empty!");
            this.trigger(this.appData);
            return;
        }

        this.appData.animations.loaderIcon = "show";
        this.trigger(this.appData);

        $.ajax({
            url: signinURL,
            dataType: 'text',
            type: 'POST',
            data: {
                email: this.appData.user.email,
                password: this.appData.user.password
            },
            success: function(data) {
                this.appData.user.password = "";
                this.appData.user.token = data;

                // save the token.
                Cookie.save('usertoken', data);

                this.getUserInfo();
            }.bind(this),
            error: function(xhr, status, err) {
                if (err == "Unauthorized") {
                    this.onHasNoToken();
                }

                var error = JSON.parse(xhr.responseText);
                this.setErrorMessage(error.error);
                this.trigger(this.appData);
            }.bind(this)
        });
    },
    setErrorMessage: function(msg) {
        this.appData.errorMessages.signin.msg = msg;
        this.appData.animations.loaderIcon = "hide";
        this.trigger(this.appData);
    },
    getUserInfo: function() {
        // get user info
        return $.ajax({
            url: getUserURL,
            dataType: 'json',
            crossDomain: true,
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                this.appData.user.isSignin = true;
                this.appData.user.id = data.id;
                this.appData.user.email = data.email;
                this.appData.user.first = data.first;
                this.appData.user.last = data.last;
                this.appData.user.picture_url = data.picture_url;
                this.appData.user.fullName = data.first+" "+data.last;
                this.trigger(this.appData);

                // get new questions
                var promises = [];
                promises.push(this.getNewQuestions());
                promises.push(this.getAnsweredQuestions());
                promises.push(this.getDismissedQuestions());
                promises.push(this.getWalletInfo());

                return Promise.all(promises);
            }.bind(this),
            error: function(xhr, status, err) {
                if (err == "Unauthorized") {
                    this.onHasNoToken();
                }
            }.bind(this)
        });
    },
    onHasNoToken: function() {
        Cookie.remove('usertoken');
        this.appData.user.isSignin = false;
        this.appData.user.token = "";
        this.appData.loadingInfo = true;
        this.trigger(this.appData);
    },
    onLoadToken: function() {
        var token = Cookie.load('usertoken');

        if (token) {
            this.appData.user.isSignin = true;
            this.appData.user.token = token;
            this.trigger(this.appData);

            this.getUserInfo();
        }
        else {
            this.onHasNoToken();
        }
    },
    getNewQuestions: function() {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/questions/new",
            dataType: 'json',
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                this.appData.questions.unanswered = data.questions;
                this.sortQuestions(this.appData.questions.unanswered);
                this.trigger(this.appData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    getAnsweredQuestions: function() {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/questions/answered",
            dataType: 'json',
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                this.appData.questions.answered = data;
                this.sortQuestions(this.appData.questions.answered);
                this.trigger(this.appData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    getDismissedQuestions: function() {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/questions/dismissed",
            dataType: 'json',
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                this.appData.questions.dismissed = data.questions;
                this.sortQuestions(this.appData.questions.dismissed);
                this.trigger(this.appData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    answerQuestion: function(question) {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/answer",
            dataType: 'json',
            type: 'POST',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            data: {
                user_name: this.appData.user.first+" "+this.appData.user.last,
                value: question.rate,
                emoji: question.emoji,
                points: question.points,
                question_text: question.text,
                user_id: this.appData.user.id,
                question_id: question.id
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    updateAnswer: function(question) {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/answer",
            dataType: 'json',
            type: 'PATCH',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            data: {
                value: question.rate,
                emoji: question.emoji,
                question_id: question.id
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    getWalletInfo: function() {
        return $.ajax({
            url: getUserURL+"/"+this.appData.user.id+"/wallet",
            dataType: 'json',
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                try {
                    this.appData.user.score = data.amount;
                    this.trigger(this.appData);

                    this.getRewardsInfo();
                }
                catch(e) {
                    this.setErrorMessage("Wallet cannot be null.");
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    getRewardsInfo: function() {
        $.ajax({
            url: getRewardsURL,
            dataType: 'json',
            type: 'GET',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].className = "service-button-base";
                }

                this.appData.rewards = data;
                this.appData.animations.loaderIcon = "hide";
                this.appData.loadingInfo = false;
                this.trigger(this.appData);

                this.activeRewards();

                window.location = "/#/wallet";
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    redeemReward: function(reward) {
        $.ajax({
            url: getRewardsURL+"/"+this.appData.user.id+"/redeem",
            dataType: 'json',
            type: 'POST',
            headers: {
                "Authorization": "Bearer "+this.appData.user.token
            },
            data: {
                user_id: this.appData.user.id,
                reward_id: reward.id,
                amount: reward.cost
            },
            success: function(data) {
                var userScore = this.appData.user.score;
                this.appData.redeemedReward = this.appData.selectedReward;
                this.appData.user.score = parseInt(userScore) - parseInt(reward.cost);

                this.trigger(this.appData);

                this.activeRewards();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    onSignup: function() {
        var fullName = this.appData.user.fullName;
        var words = fullName.split(/\s+/g,2);
        var firstName = words[0];
        var lastName = words[1] || firstName;
        var email = this.appData.user.email;
        var password = this.appData.user.password;

        this.setErrorMessage("");
        this.trigger(this.appData);

        // validate values
        if (!/([^\s])/.test(fullName)) {
            console.log("here");
            this.setErrorMessage("User name cannot be empty!");
            this.trigger(this.appData);
            return;
        }

        if (!/([^\s])/.test(email)) {
            this.setErrorMessage("Email cannot be empty!");
            this.trigger(this.appData);
            return;
        }

        if (!/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email)) {
            this.setErrorMessage("Email must be email format!");
            this.trigger(this.appData);
            return;
        }

        if (!/([^\s])/.test(password)) {
            this.setErrorMessage("Password cannot be empty!");
            this.trigger(this.appData);
            return;
        }

        this.appData.animations.loaderIcon = "show";
        this.trigger(this.appData);

        $.ajax({
            url: signupURL,
            dataType: 'text',
            type: 'POST',
            data: {
                first: firstName,
                last: lastName,
                email: email,
                password: password
            },
            success: function(data) {
                this.appData.user.password = "";
                this.appData.user.token = data;

                // save the token.
                Cookie.save('usertoken', data);

                this.getUserInfo();
            }.bind(this),
            error: function(xhr, status, err) {
                var error = JSON.parse(xhr.responseText);
                this.setErrorMessage(error.error);
                this.trigger(this.appData);
            }.bind(this)
        });
    },
    onChangeName: function(val) {
        this.appData.user.fullName = val;
        var words = val.split(/\s+/g,2);
        this.appData.user.first = words[0];
        this.appData.user.last = words[1] || words[0];

        this.trigger(this.appData);
    },
    onChangeEmail: function(val) {
        this.appData.user.email = val;
        this.trigger(this.appData);
    },
    onChangePassword: function(val) {
        this.appData.user.password = val;
        this.trigger(this.appData);
    },
    openReward: function(reward) {
        this.appData.selectedReward = reward;
        this.appData.isRewardOpen = true;
        this.trigger(this.appData);
    },
    closeReward: function() {
        //this.appData.selectedReward = {};
        this.appData.isRewardOpen = false;
        this.trigger(this.appData);
    },
    claimReward: function(reward) {
        this.appData.isRewardOpen = false;

        this.trigger(this.appData);

        this.redeemReward(reward);

        var self = this;

        setTimeout(function() {
            self.appData.animations.rewardToolbarAnim = "reward-toolbar";
            self.trigger(self.appData);
        }, 10000);
    },
    activeRewards: function() {
        for (var i = 0; i < this.appData.rewards.length; i++) {
            var el = this.appData.rewards[i];
            var userScore = this.appData.user.score;

            if (el.cost <= userScore) {
                el.purchasable = true;
            }
        }

        this.trigger(this.appData);
    },
    sortQuestions: function(questions) {
        questions.sort(
            firstBy('points', -1)
            .thenBy('text')
        );
    },
    pointSort: function(a, b) {
        var aPoints = parseInt(a.points);
        var bPoints = parseInt(b.points);

        if (aPoints == bPoints) {
            return 0;
        }

        if (aPoints > bPoints) {
            return -1;
        }

        if (aPoints < bPoints) {
            return 1;
        }
    },
    onReceiveScore: function(question) {
        var pts = question.points;
        this.appData.user.added = "+"+pts;
        this.appData.user.score = parseInt(this.appData.user.score) + parseInt(pts);
        this.appData.animations.scoreboxScoreAnim = "scorebox-score-added";
        this.appData.animations.scoreboxPtsAnim = "scorebox-text-added";
        this.appData.animations.scoreboxAddedAnim = "scorebox-points-added";

        this.trigger(this.appData);

        var self = this;

        setTimeout(function() {
            self.appData.animations.scoreboxScoreAnim = "scorebox-score";
            self.appData.animations.scoreboxPtsAnim = "scorebox-text";
            self.appData.animations.scoreboxAddedAnim = "scorebox-points";

            self.trigger(self.appData);
        }, 10000);
    },
    onScoreReturnToNormal: function() {
        this.appData.animations.scoreboxScoreAnim = "scorebox-score";
        this.appData.animations.scoreboxPtsAnim = "scorebox-text";
        this.appData.animations.scoreboxAddedAnim = "scorebox-points";

        this.trigger(this.appData);
    },
    onClickReward: function(reward) {
        var i = _.indexOf(this.appData.rewards, reward);
        // this.appData.lastSelection.className = "service-button-base";
        // this.appData.rewards[i].className = "service-button-selected";
        // this.appData.lastSelection = this.appData.rewards[i];
        // this.trigger(this.appData);
    },
    onUpdateAnswer: function(question) {
        this.trigger(this.appData);
        this.updateAnswer(question);
    },
    onAnswerQuestion: function(question) {
        this.activeRewards();

        this.answerQuestion(question)
        .then(function () {
            // move the question to the correct section
            var unanswered = this.appData.questions.unanswered;
            var i = _.indexOf(unanswered, question);

            this.appData.questions.answered.push(unanswered[i]);
            this.appData.questions.unanswered.splice(i,1);
            this.trigger(this.appData);
        }.bind(this));
    },
    onAnswerDismissedQuestion: function(question) {
        this.activeRewards();

        this.answerQuestion(question)
        .then(function () {
            // move the question to the correct section
            var dismissed = this.appData.questions.dismissed;
            var i = _.indexOf(dismissed, question);

            this.appData.questions.answered.push(dismissed[i]);
            this.appData.questions.dismissed.splice(i,1);
            this.trigger(this.appData);
        }.bind(this));
    },
    onDismissQuestion: function(question) {
        var unanswered = this.appData.questions.unanswered;
        var i = _.indexOf(unanswered, question);

        this.appData.questions.dismissed.push(unanswered[i]);
        this.appData.questions.unanswered.splice(i,1);

        this.trigger(this.appData);
    }
});

module.exports = AppStore;
