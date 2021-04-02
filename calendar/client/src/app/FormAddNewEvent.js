import React, { Component} from 'react';
import {addEvent} from "../store/actions";
import NewEventInput from "./NewEventInput";
import {store} from "../index";

export default class FormAddNewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: "",
            minute: "",
            text: "",

            hourValid: true,
            minuteValid: true
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {hour, minute, text} = this.state;

        const hourRule = /^[0-9]{1,2}$/;
        let hourValid = (hourRule.test(hour) && hour < 24);
        const minuteRule = /^[0-9]{2}$/;
        let minuteValid = (minuteRule.test(minute) && minute <= 60)

        if (hourValid && minuteValid) {
            let time = hour + ":" + minute;
            let event = {day: this.props.day, time, text}
            store.dispatch(addEvent(event));
        }

        this.setState({hour: "", minute: "", text: "", hourValid, minuteValid})
    }

    onChange = (field, value) => {
        this.setState({[field]: value})
    }

    render() {
        const {hour, minute, text, hourValid, minuteValid} = this.state;

        return (
            <div id="dif">
                <form className="formAddNew" onSubmit={this.onSubmit}>
                    <div className="setTime">
                        <NewEventInput
                            name="hour"
                            placeholder="Enter hours"
                            value={hour}
                            valid={hourValid}
                            align="left"
                            onChange={this.onChange}
                            required
                        />
                        <b>:</b>
                        <NewEventInput
                            name="minute"
                            placeholder="Enter minutes"
                            value={minute}
                            valid={minuteValid}
                            align="right"
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <NewEventInput
                        name="text"
                        placeholder="Enter text"
                        value={text}
                        onChange={this.onChange}
                        required
                    />
                    <button type="submit">Add</button>
                    <hr/>
                </form>
            </div>
        )
    }
}
