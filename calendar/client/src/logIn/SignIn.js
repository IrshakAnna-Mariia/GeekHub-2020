import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {postResponseSignIn} from "../store/httpMethods";
import Input from "./Input";
import {forSetError, setStartEvents} from "../store/reducers"

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logger: this.props.logger,
            error: this.props.error,

            email: "",
            password: "",

            emailValid: true,
            passwordValid: true
        }
    }

    componentDidUpdate(prev) {
        const {logger, error} = this.props
        if (logger !== prev.logger || error !== prev.error) {
            this.setState({logger: this.props.logger, error: this.props.error})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        postResponseSignIn(email, password).then(value => {
            if (value===false) {return this.props.forSetError("Error with connection. Please reload the page");}
            if (value.email && value.password) {
                this.props.setStartEvents({email: email, events: [...value.events]})
            }
            if (!value.email) {this.setState({emailValid: false});}
            if (!value.password) {this.setState({passwordValid: false});}

       }, reason => {this.props.forSetError(reason);})
    }

    onChange = (field, value) => {
        this.setState({[field]: value})
    }

    render() {
        if (this.props.error) {return <Redirect to="/error" />}
        if (this.props.logger) {return <Redirect to="/" />}
        else {
            const {email, password, emailValid, passwordValid} = this.state;
            return (
                <div className="containerReg">
                    <form onSubmit={this.onSubmit}>
                        <div >
                            <h1 className="signIn">Sign In</h1>
                            <p className="signIn">Please fill in this form to sign in an account</p>
                            <div id="result">
                            </div>
                            <hr/>

                            <Input
                                label="Email"
                                type="text"
                                name="email"
                                value={email}
                                valid={emailValid}
                                invalidText=" *User does not exist, please register*"
                                placeholder="Enter Email"
                                onChange={this.onChange}
                            />
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                valid={passwordValid}
                                invalidText=" *Incorrect entered password*"
                                placeholder="Enter Password"
                                onChange={this.onChange}
                            />

                            <hr/>
                        </div>

                        <button type="submit" className="loginbtn">Sign in</button>

                        <Link to='/register'>
                            <button type="button" className="registerbth">Register</button>
                        </Link>

                    </form>
                </div>
            )
        }
    }
}

SignIn = connect(
    (state) => {
        return {
            logger: state.rootReducers.toolkit.logger,
            error: state.rootReducers.toolkit.error
        }
    },
    {
        setStartEvents,
        forSetError
    }
)(SignIn);
