import React, { Component} from 'react'
import {connect} from 'react-redux'
import {postNewEvent} from '../store/httpMethods'
import {addEvent} from "../store/actions";
import Error from "./Error";

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
        if (checkTime(inputHour.value) && checkTime(inputMinute.value)) {
            let time = inputHour.value + ":" + inputMinute.value;
            let event = {
                day: this.props.day,
                time: time,
                text: inputText.value
            }
            postNewEvent(this.props.email, event)
                .then(value => {
                    if (value === false) {
                        return <Error message="Event not added"/>
                    }
                });
            this.props.dispatch(addEvent(event));
            this.setState({correctInputHour: true});
            this.setState({correctInputMinute: true});
            inputHour.value = '';
            inputMinute.value = '';
            inputText.value = '';
        } else if (!checkTime(inputHour.value)) {
            this.setState({correctInputHour: false});
        } else if (!checkTime(inputMinute.value)) {
            this.setState({correctInputMinute: false});
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
                            className = {this.state.correctInputHour ? 'right' : 'right wrong'}
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

function checkTime(propsTime) {
    const timeRule = /^[0-9]{2}$/;
    return (
        timeRule.test(propsTime)
    );
}