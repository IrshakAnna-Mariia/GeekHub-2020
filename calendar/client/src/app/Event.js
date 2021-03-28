import React, { Component} from 'react'
import {connect} from 'react-redux'
import {removeEvent, editEvent, setEdit} from "../store/actions";
import {postRemoveEvent, postEditEvent} from "../store/httpMethods"
import Error from "./Error";
import EditEvent from "./EditEvent";
import {Link} from "react-router-dom";

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
        postRemoveEvent(this.props.email, currentEvent)
            .then(value => {
                if (value === false) {
                    return <Error message={"Event not deleted"}/>
                }
            })
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
        postEditEvent(
            this.props.email,
            editedEvent,
            currentEvent
        ).then(value => {
            if (value === false) {
                return <Error message={"Event not deleted"}/>
            }
        })
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