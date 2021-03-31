import React, { Component} from 'react'
import {connect} from 'react-redux'
import {removeEvent, editEvent, setEdit} from "../store/actions";
import EditEvent from "./EditEvent";

export default class Event extends Component {

    onRemove = () => {
        let currentEvent = {
            day: this.props.day,
            time: this.props.time,
            text: this.props.text
        }
        this.props.dispatch(removeEvent({
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
        this.props.dispatch(editEvent({
            allEvents: [...this.props.allEvents],
            editedEvent,
            currentEvent
        }))
    }

     onClick = () => {
        this.props.dispatch(setEdit(true))
    }

    render() {
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
                {this.props.edit ? <EditEvent text={this.props.text} onEdit={this.onEdit}/> : <p className="textEvent">{this.props.text}</p>}
            </div>
        )
    }
}

Event = connect()(Event)
