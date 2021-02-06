import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ViewTextTodo from "./ViewTextTodo";

export default class Todo extends Component {
    onClickComplete = () => this.props.onClickCompleted(this.props.index);
    onClickRemove = () => this.props.onClickRemove(this.props.index);
    onClickView = () => this.props.onClickView(this.props.index);

    render() {
        return (
            <div>
                <li className={this.props.complete ? "completed" : "view"}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={this.props.complete}
                            readOnly
                            onClick={this.onClickComplete}
                        />
                        <ViewTextTodo
                            edit={this.props.edit}
                            text={this.props.text}
                        />
                        <button
                            className="destroy"
                            onClick={this.onClickRemove}
                        />
                    </div>
                    <li>
                        .
                        <Link
                            to={'/todo/:' + this.props.index}
                            className="viewTodo"
                            onClick={this.onClickView}
                        >
                            View Todo
                        </Link>
                        <Link
                            to={'/todo/:' + this.props.index + '/edit'}
                            className="editTodo"
                            onClick={this.onClickView}
                        >
                            Edit Todo
                        </Link>
                    </li>
                    <input className="edit" value="Create a TodoMVC template" readOnly/>
                </li>
            </div>
        )
    }
}
Todo = connect()(Todo);