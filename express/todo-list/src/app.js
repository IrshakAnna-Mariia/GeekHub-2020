import React, {Component} from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <section className="todoapp">
                <Router>
                    <Header todos={this.props.todoList}/>
                    <Switch>
                        <Route exact path="/">
                            <TodoList
                                todos={this.props.todoList}
                                allTodos={this.props.todoList}
                            />
                        </Route>
                        <Route exact path="/active">
                            <TodoList
                                todos={this.props.todoListActive}
                                allTodos={this.props.todoList}
                            />
                        </Route>
                        <Route exact path="/completed">
                            <TodoList
                                todos={this.props.todoListCompleted}
                                allTodos={this.props.todoList}
                            />
                        </Route>
                        <Route exact path={"/todo/:id"}>
                            <TodoList
                                todos={this.props.todoListCurrent}
                                allTodos={this.props.todoList}
                            />
                        </Route>
                        <Route exact path={"/todo/:id/edit"}>
                            <TodoList
                                todos={this.props.todoListCurrent}
                                allTodos={this.props.todoList}
                                edit={true}
                            />
                        </Route>

                    </Switch>
                    <Footer
                        todos={this.props.todoList}
                        countTodos={this.props.count}
                    />
                </Router>
            </section>
        )
    }
}
