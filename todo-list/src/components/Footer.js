import React, {Component} from 'react'
import {connect} from 'react-redux'
import {counterCompletedTodo, removeTodo, setTodos} from '../store/actions'
import {Link} from "react-router-dom";

export default class Footer extends Component {

    onClickClear = () => {
        let finallyArray = [];
        let arrayCompleted = this.props.todos.map((cell) => {
            if (cell.complete === true) {
                return cell
            }
            finallyArray.push(cell);
        })
        arrayCompleted.reverse().map((cell) => {
            if (!(cell === undefined)) {
                this.props.dispatch(removeTodo(cell.text));
            }
        });
        this.props.dispatch(setTodos(finallyArray));
        this.props.dispatch(counterCompletedTodo(this.props.todos));
    }

    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.countTodos}</strong>
                    item left
                </span>
                <ul className="filters">
                    <li>
                        <Link to='/' className="selected">All</Link>
                    </li>
                    <li>
                        <Link to='/active'>Active</Link>
                    </li>
                    <li>
                        <Link to='/completed'>Completed</Link>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick={this.onClickClear}
                >Clear completed</button>
            </footer>
        )
    }
}
Footer = connect()(Footer);
