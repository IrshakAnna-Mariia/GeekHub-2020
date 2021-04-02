import React, { Component} from 'react';
import {removeEvent, editEvent, setEdit} from "../store/actions";
import EditEvent from "./EditEvent";
import {store} from "../index";

export default class Event extends Component {

    onRemove = () => {
        let currentEvent = {
            day: this.props.day,
            time: this.props.time,
            text: this.props.text
        }
        store.dispatch(removeEvent({
            allEvents: [...this.props.allEvents],
            currentEvent
        }))
    }

    onEdit = (newText) => {
        let editedEvent = {
            day: this.props.day,
            time: this.props.time,
            text: this.props.text
        }
        let currentEvent = {
            day: this.props.day,
            time: this.props.time,
            text: newText
        }
        store.dispatch(editEvent({
            allEvents: [...this.props.allEvents],
            editedEvent,
            currentEvent
        }))
    }

     onClick = () => {
        store.dispatch(setEdit(true))
    }

    render() {
        const {edit, text} = this.props
        return (
            <div>
                <h1 className="time">
                    <b
                        className="remove"
                        onClick={this.onRemove}
                    >☓</b>
                    {this.props.time}{' ( '}
                    <i onClick={this.onClick}>edit</i>
                    {'):'}
                </h1>
                {edit ? <EditEvent text={text} onEdit={this.onEdit}/> : <p className="textEvent">{text}</p>}
            </div>
        )
    }
}
