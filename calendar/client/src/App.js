import React, {Component} from 'react'
import SignIn from "./logIn/SignIn";
import Register from "./logIn/Register";
import Main from "./app/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Error from "./app/Error";

export default class App extends Component {
    render() {
        return (
            <section>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <SignIn/>
                        </Route>
                        <Route exact path="/register">
                            <Register/>
                        </Route>

                        <Route exact path="/">
                            <Main/>
                        </Route>
                        <Route exact path="/error">
                            <Error/>
                        </Route>
                    </Switch>
                </Router>
            </section>
        )
    }
}
