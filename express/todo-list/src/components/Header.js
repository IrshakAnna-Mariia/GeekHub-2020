import React, { Component} from 'react'
import {connect} from 'react-redux'
import {addTodo, countAddTodo, removeWrittenTodo, setTodos} from '../store/actions'
import socket from '../store/socket'

let input;

export default class Header extends Component {

    onChange = (e) => {
        if (e.key === 'Backspace') {
            let newValue = input.value.slice(0, input.value.length-1);
            socket.emit('write_todo', [
                ...this.props.todos,
                {text: input.value + e.key, complete: false}
            ],newValue, input.value)
        } else if (e.key === 'Enter') {
            //this.props.dispatch(removeWrittenTodo(input.value))
            this.props.dispatch(addTodo(input.value));
            this.props.dispatch(countAddTodo());
            this.props.dispatch(setTodos([
                ...this.props.todos,
                {text: input.value, complete: false}
            ]))
            input.value = "";
        } else {
            socket.emit('write_todo', [
                ...this.props.todos,
                {text: input.value + e.key, complete: false}
            ], input.value + e.key, input.value)
        }
    }
    inputHTML = (node) => input = node

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    ref={this.inputHTML}
                    onKeyDown={this.onChange}
                />
            </header>
        )
    }
}

Header = connect()(Header);
