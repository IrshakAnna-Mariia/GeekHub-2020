import React, {Component} from 'react'
import SignIn from "./logIn/SignIn";
import Register from "./logIn/Register";
import Main from "./app/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <section>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <SignIn logger={this.props.logger}/>
                        </Route>
                        <Route exact path="/register">
                            <Register/>
                        </Route>

                        <Route exact path="/">
                            <Main
                                email={this.props.email}
                                events={this.props.events}
                                logger={this.props.logger}
                                edit={this.props.edit}
                            />
                        </Route>
                    </Switch>
                </Router>
            </section>
        )
    }
}