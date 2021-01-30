import React, {Component} from 'react'

export default class Footer extends Component {

    onClickClear() {
        this.props.clearCompletedTodo();
    }
    onClickAll() {
        this.props.openAllTodo();
    }
    onClickActive() {
        this.props.openActiveTodo();
    }
    onClickCompleted() {
        this.props.openCompletedTodo();
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
                        <a
                            className="selected"
                            href={"#/"}
                            onClick={() => {this.onClickAll()}}
                        >All</a>
                    </li>
                    <li>
                        <a
                            href={"#/active"}
                            onClick={() => {this.onClickActive()}}
                        >Active</a>
                    </li>
                    <li>
                        <a
                            href={"#/completed"}
                            onClick={() => {this.onClickCompleted()}}
                        >Completed</a>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick={() => {this.onClickClear()}}
                >Clear completed</button>
            </footer>
        )
    }
}
