import React, {Component} from 'react'

export default class TodoList extends Component {
    onClickRemove(e) {
        this.props.removeTodo(e);
    }
    onClickCompleted(e) {
        this.props.completedTodo(e);
    }

    render() {
        return (
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox"/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {this.props.todos.map((cell, index) =>
                            <li className={cell.complete ? "completed": "view"} key={index}>
                                <div className="view">
                                    <input
                                        className="toggle"
                                        type="checkbox"
                                        value={index}
                                        checked = {!!cell.complete}
                                        onClick={(e) => {this.onClickCompleted(e)}}
                                    />
                                    <label>{cell.text}</label>
                                    <button
                                        value={index}
                                        className="destroy"
                                        onClick={(e) => {this.onClickRemove(e)}}
                                    ></button>
                                </div>
                                <input className="edit" value="Create a TodoMVC template"/>
                            </li>
                        )}
                    </ul>
            </section>
        )
    }
}