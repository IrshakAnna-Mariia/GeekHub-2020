import React, { Component} from 'react'
import {setEdit} from "../store/actions";
import {store} from '../index'

export default class EditEvent extends Component {

    onEdit = (e) => {
        if (e.key === 'Enter') {
            this.props.onEdit(e.currentTarget.value);
            store.dispatch(setEdit(false));
        }
    }

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
