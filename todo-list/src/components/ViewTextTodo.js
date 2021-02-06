import React, {Component}  from 'react'
import {isEdit, isEditAllTodos} from "../store/actions";
import {connect} from "react-redux";

let input;

export default class ViewTextTodo extends Component {

    inputHTML = (node) => input = node
    onEnter = (e) => {
        if (e.key === 'Enter'){
            this.props.dispatch(isEditAllTodos(this.props.text, input.value));
            this.props.dispatch(isEdit({text: this.props.text, newText: input.value}));
        }
    }

    render() {
        if (this.props.edit === undefined) {
            return (
                <label>{this.props.text}</label>
            )
        } else return (
            <input
                className="new-todo"
                defaultValue={this.props.text}
                autoFocus
                ref={this.inputHTML}
                onKeyPress={this.onEnter}
            />
        )
    }
}
ViewTextTodo = connect()(ViewTextTodo);