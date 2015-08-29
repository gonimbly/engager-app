var Reflux = require('reflux');
var _ = require('lodash');

var AppActions = require("../actions/AppActions");
var UserActions = require('../actions/UserActions')

var data = [];

var endpoint = "https://engager-api.herokuapp.com";
var userId = "1";

var AppStore = Reflux.createStore({
    appData: {
        user: {
            id: "1",
            username: "David",
            score: 270,
            added: "",
            rewards: []
        },
        questions: {
            unanswered: [
                {
                    id: "1",
                    text: "bla blafdkjhdlkfjh lsdk fjhg lksdfjh glksd jhfg lksdj hfl lfdkjg lskdjf glsd fghlsd kfjghdls  bla?",
                    points: 5
                },
                {
                    id: "2",
                    text: "bla bla bla id 2?",
                    points: 12
                },
                {
                    id: "3",
                    text: "bla bla bla id 3?",
                    points: 20
                },
            ],
            answered: [
                {
                    id: "5",
                    text: "bla bla bla id 5?",
                    points: 1
                }
            ],
            dismissed:[
                {
                    id: "4",
                    text: "bla bla bla id 4?",
                    points: 10
                },
            ]
        },
        isRewardOpen: false,
        selectedReward: {},
        rewards: [
            {
                id: "1",
                name: "Uber",
                redeem: 10,
                points: 300,
                description: "Redeem $10 in credit for Uber car services! Just click Claim and check your profile for the reward code. ",
                className: "service-button-base"
            },
            {
                id: "2",
                name: "Uber2",
                redeem: 5,
                points: 280,
                description: "Redeem $10 in credit for Uber car services! Just click Claim and check your profile for the reward code. ",
                className: "service-button-base"
            },
            {
                id: "3",
                name: "Uber3",
                redeem: 30,
                points: 230,
                description: "Redeem $10 in credit for Uber car services! Just click Claim and check your profile for the reward code. ",
                className: "service-button-base"
            },
            {
                id: "4",
                name: "Uber4",
                redeem: 50,
                points: 260,
                description: "Redeem $10 in credit for Uber car services! Just click Claim and check your profile for the reward code. ",
                className: "service-button-base"
            },
        ],
        animations: {
            scoreboxScoreAnim: "scorebox-score",
            scoreboxPtsAnim: "scorebox-text",
            scoreboxAddedAnim: "scorebox-points",
            rewardToolbarAnim: "reward-toolbar",
        }
    },
    init: function() {
        console.log('ServicesStore initialized');
        // sort the list.
        this.sortQuestions();
        this.activeRewards();

        this.listenTo(AppActions.clickOnService, this.onClickReward);
        this.listenTo(AppActions.answerQuestion, this.onAnswerQuestion);
        this.listenTo(AppActions.answerDismissedQuestion, this.onAnswerDismissedQuestion);
        this.listenTo(AppActions.dismissQuestion, this.onDismissQuestion);
        this.listenTo(AppActions.updateRewards, this.activeRewards);
        this.listenTo(AppActions.openReward, this.openReward);
        this.listenTo(AppActions.claimReward, this.claimReward);
        this.listenTo(AppActions.closeReward, this.closeReward);
        this.listenTo(UserActions.increasePoints, this.onReceiveScore);
        this.listenTo(UserActions.scoreToNormal, this.onScoreReturnToNormal);
    },
    getInitialState: function(){
        return this.appData;
    },
    openReward: function(reward) {
        this.appData.selectedReward = reward;
        this.appData.isRewardOpen = true;
        this.trigger(this.appData);
    },
    closeReward: function() {
        this.appData.selectedReward = {};
        this.appData.isRewardOpen = false;
        this.trigger(this.appData);
    },
    claimReward: function(reward) {
        this.appData.animations.rewardToolbarAnim = "reward-toolbar-added";
        this.appData.isRewardOpen = false;

        // move the reward to user's rewards
        var i = _.indexOf(this.appData.rewards, reward);
        this.appData.rewards.splice(i, 1);
        this.appData.user.rewards.push(reward);

        this.trigger(this.appData);

        var self = this;

        setTimeout(function() {
            self.appData.animations.rewardToolbarAnim = "reward-toolbar";
            self.trigger(self.appData);
        }, 3000);
    },
    activeRewards: function() {
        for (var i = 0; i < this.appData.rewards.length; i++) {
            var el = this.appData.rewards[i];
            var userScore = this.appData.user.score;

            if (el.points <= userScore) {
                el.className = "service-button-selected";
            }
        }

        this.trigger(this.appData);
    },
    sortQuestions: function() {
        this.appData.questions.unanswered.forEach(function(el, index, arr) {
            arr.sort(function(a, b) {
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
            });
        });
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
        }, 3000);
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
    onAnswerQuestion: function(question, user) {
        var unanswered = this.appData.questions.unanswered;
        var i = _.indexOf(unanswered, question);

        this.appData.questions.answered.push(unanswered[i]);
        this.appData.questions.unanswered.splice(i,1);

        this.trigger(this.appData);

        this.activeRewards();
    },
    onAnswerDismissedQuestion: function(question, user) {
        var dismissed = this.appData.questions.dismissed;
        var i = _.indexOf(dismissed, question);

        this.appData.questions.answered.push(dismissed[i]);
        this.appData.questions.dismissed.splice(i,1);

        this.trigger(this.appData);

        this.activeRewards();
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
