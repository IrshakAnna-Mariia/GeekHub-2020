import React, { Component} from 'react'
import {connect} from 'react-redux'
import {addEvent} from "../store/actions";

let inputHour;
let inputMinute;
let inputText;

export default class FormAddNewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctInputHour: true,
            correctInputMinute: true
        }
    }

    hours = (node) => inputHour = node
    minutes = (node) => inputMinute = node
    text = (node) => inputText = node

    onClick = () => {
        this.setState({correctInputHour: true});
        this.setState({correctInputMinute: true});
        if (!checkHours(inputHour.value)) {
            this.setState({correctInputHour: false});
        }
        if (!checkMinutes(inputMinute.value)) {
            this.setState({correctInputMinute: false});
        }
        if (checkHours(inputHour.value) && checkMinutes(inputMinute.value)) {
            let time = inputHour.value + ":" + inputMinute.value;
            let event = {
                day: this.props.day,
                time: time,
                text: inputText.value
            }
            this.props.dispatch(addEvent(event));
            inputHour.value = '';
            inputMinute.value = '';
            inputText.value = '';
        }
    }

    render() {
        return (
            <div id="dif">
                <div className="formAddNew">
                    <div className="setTime">
                        <input
                            type="text"
                            placeholder="Enter hours"
                            className = {this.state.correctInputHour ? 'left' : 'left wrong'}
                            ref={this.hours}
                            required
                        />
                        <b>:</b>
                        <input
                            type="text"
                            placeholder="Enter minutes"
                            className = {this.state.correctInputMinute ? 'right' : 'right wrong'}
                            ref={this.minutes}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter text"
                        ref={this.text}
                        required
                    />
                    <button type="button" onClick={this.onClick}>Add</button>
                    <hr/>
                </div>
            </div>
        )
    }
}

FormAddNewEvent = connect()(FormAddNewEvent);

function checkHours(propsTime) {
    const timeRule = /^[0-9]{1,2}$/;
    return (
        timeRule.test(propsTime)
        && propsTime < 24
    );
}

function checkMinutes(propsTime) {
    const timeRule = /^[0-9]{2}$/;
    return (
        timeRule.test(propsTime)
        && propsTime <= 60
    );
}
