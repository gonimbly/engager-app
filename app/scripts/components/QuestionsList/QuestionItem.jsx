var React = require('react');
var SwipeToRevealOptions = require('./SwipeRow');

var QuestionItem = React.createClass({
    PropTypes:{
        question: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    onClick: function(question){
        this.props.onClick(question);
    },

    createLeftContent: function() {
        return ("");
    },

    render: function() {
        var question = this.props.question;

        var bg = "#f8f8fa";
        var text = "#000000";

        var pointsStyle = {
            height: '80px',
            width: '100%',
            marginLeft: '20px',
            marginRight: '20px',
            right: '0px',
            fontSize: '17px',
            verticalAlign: 'middle',
            color: '#71c04f'
        };

        var okStyle = {
            height: '80px',
            width: '100%',
            right: '0px',
            verticalAlign: 'middle',
            color: '#71c04f',
        };

        if (question.state == "1") {
            bg = "#71c04f";
            text = "#FFFFFF";
            pointsStyle.display = "none";
        }
        else {
            okStyle.display = "none";
        }

        var item = {
            leftOptions: [{
                content: "<Rating  />",
                class: 'trash'
            }],
        };

        return (
            <div>
                <SwipeToRevealOptions
                    actionThreshold={300}
                    visibilityThreshold={50}
                    leftOptions={item.leftOptions}
                    rightOptions={[]}
                    callActionWhenSwipingFarRight={true}
                    callActionWhenSwipingFarLeft={false}>
                    <table>
                        <tr>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    left: '0',
                                    verticalAlign: 'middle',
                                }}>
                                <span className="wordwrap">
                                    {question.text}
                                </span>
                            </td>
                            <td style={{
                                    height: '80px',
                                    width: '100%',
                                    marginTop: '10px',
                                    verticalAlign: 'middle',
                                }}>
                                <span style={pointsStyle} className="text-center">
                                    <label style={{paddingTop: '20px', marginBottom: '0px'}}>{question.points}</label>
                                    <div style={{margin: '0px', lineHeight: '3px', fontSize: '10px'}}>pts</div>
                                </span>
                                <span style={okStyle} className="text-center">
                                    <img src="../../../assets/check.png" width="20px" height="16px"/>
                                </span>
                            </td>
                        </tr>
                    </table>
                </SwipeToRevealOptions>
            </div>
        );
    }
});

module.exports = QuestionItem;
