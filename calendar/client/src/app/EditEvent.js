import React, { Component} from 'react'
import {connect} from 'react-redux'
import {removeEvent, editEvent, setEdit} from "../store/actions";
import {postRemoveEvent} from "../store/httpMethods"

let inputText;

export default class EditEvent extends Component {

    onEdit = (e) => {
        if (e.key === 'Enter') {
            this.props.onEdit(inputText.value);
            this.props.dispatch(setEdit(false));
        }
    }

    text = (node) => inputText = node;

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter text"
                    defaultValue={this.props.text}
                    ref={this.text}
                    onKeyPress={this.onEdit}
                    required
                />
            </div>
        )
    }
}

EditEvent = connect()(EditEvent)