var React = require('react');



var QuestionItem = React.createClass({
    PropTypes:{
        question: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    onClick: function(question){
        this.props.onClick(question);
    },

    render: function() {
        var question = this.props.question;

        var bg = "#f8f8fa";
        var text = "#000000";

        var pointsStyle = {
            height: '80px',
            width: '100%',
            right: '0px',
            display: 'table-cell',
            verticalAlign: 'middle',
            color: '#71c04f'
        };

        var okStyle = {
            height: '80px',
            width: '100%',
            right: '0px',
            display: 'table-cell',
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

        return (
            <div style={{
                    display: 'table',
                    backgroundColor: bg,
                    height: '80px',
                    width: '100%',
                    paddingLeft: '10px',
                    textAlign: 'left',
                    color: text
                }} className="">
                <span style={{
                        height: '80px',
                        width: '80%',
                        left: '0',
                        display: 'table-cell',
                        verticalAlign: 'middle',
                    }} className="wordwrap">
                    {question.text}
                </span>
                <span style={pointsStyle} className="text-center">
                    <label style={{marginBottom: '0px'}}>{question.points}</label>
                    <div style={{margin: '0px', lineHeight: '3px', fontSize: '10px'}}>pts</div>
                </span>
                <span style={okStyle} className="text-center">
                    <img src="../../../assets/check.png" width="20px" height="16px"/>
                </span>
            </div>
        );
    }
});

module.exports = QuestionItem;
