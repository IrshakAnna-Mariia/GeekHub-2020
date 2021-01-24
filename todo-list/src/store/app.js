import React, {Component} from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

export default class App extends Component {
    render() {
        return (
            <section className="todoapp">
                <Header onEnter = {(e) => this.props.onAdd(e)}/>
                <TodoList
                    todos = {this.props.todoList}
                    removeTodo = {(e) => this.props.onRemove(e)}
                    completedTodo = {(e) => this.props.onCompleted(e)}
                />
                <Footer
                    clearCompletedTodo = {() => this.props.onClearCompleted()}
                    openCompletedTodo = {() => this.props.onViewCompleted()}
                    counterOfItem = {() => this.props.counterOfItemLeft()}
                />
            </section>
        )
    }
}