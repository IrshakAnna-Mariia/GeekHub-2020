import React, {Component} from 'react'
import Todo from './Todo'
import {connect} from 'react-redux'
import {
    removeTodo,
    countMinesTodo,
    isCompleted,
    forCompleteTodo,
    forRemoveTodo,
    setCurrentTodo, setTodosForAll
} from '../store/actions'

export default class TodoList extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    onClickCompleted = (index) => {
        this.props.dispatch(isCompleted(this.props.todos[index].text));
        if (!(this.props.todos[index].complete === true)){
            this.props.dispatch(countMinesTodo());
        }
        this.props.dispatch(forCompleteTodo({
            allTodo: this.props.allTodos,
            currentTodo: this.props.todos[index]
        }));
    }

    onClickRemove = (index) => {
        this.props.dispatch(removeTodo(this.props.todos[index].text));
        if (this.props.todos[index].complete === false) {this.props.dispatch(countMinesTodo());}
        this.props.dispatch(forRemoveTodo({
            allTodo: this.props.allTodos,
            currentTodo: this.props.todos[index]
        }));
    }

    onClickView = (index) => {
        this.props.dispatch(setCurrentTodo(this.props.todos[index]));
    }

    render() {
        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox"/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {this.props.todos.map((cell, index) =>
                        <Todo
                            key={index}
                            index={index}
                            onClickCompleted={this.onClickCompleted}
                            onClickRemove={this.onClickRemove}
                            onClickView ={this.onClickView}
                            edit={this.props.edit}
                            {...cell}
                        />
                    )}
                </ul>
            </section>
        )
    }
}

TodoList = connect()(TodoList);