import React, { Component} from 'react'
import {connect} from 'react-redux'
import {addTodo, countAddTodo, setTodos} from '../store/actions'

let input;

export default class Header extends Component {

    onChange = (e) => {
        if (e.key === 'Enter'){
            this.props.dispatch(addTodo(input.value));
            this.props.dispatch(countAddTodo());
            this.props.dispatch(setTodos([
                ...this.props.todos,
                {text: input.value, complete: false}
            ]))
            input.value = "";
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
                    onKeyPress={this.onChange}

                />
            </header>
        )
    }
}

Header = connect()(Header);