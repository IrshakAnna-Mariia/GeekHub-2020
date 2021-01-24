import React, {Component} from 'react'

export default class Footer extends Component {

    onClickClear() {
        this.props.clearCompletedTodo();
    }
    onClickCompleted() {
        this.props.openCompletedTodo();
    }
    counter(){
        return this.props.counterOfItem()
    }

    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.counter()}</strong>
                    item left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            className="selected"
                            href={"#/"}
                        >All</a>
                    </li>
                    <li>
                        <a
                            href={"#/active"}
                        >Active</a>
                    </li>
                    <li>
                        <a
                            href={"#/completed"}
                            onClick={this.onClickCompleted()}
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
