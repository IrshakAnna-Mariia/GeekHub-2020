import React, { Component} from 'react'
import {postResponseRegister} from '../store/httpMethods'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {forSetError} from "../store/reducers";
import Input from "./Input";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: "",

            successRegValid: false,
            isAlreadyRegValid: false,
            emailValid: true,
            passwordValid: true,
            repeatPasswordValid: true
        }
    }

    componentDidUpdate(prev) {
        const {error} = this.props
        if (error !== prev.error) {this.setState({error: this.props.error})}
    }

    onSubmit = (e) => {
        e.preventDefault()

        const {email, password, repeatPassword} = this.state;

        const emailParts = email.split('@');
        const username = emailParts[0];
        const domain = emailParts[1];
        const usernameRule = /^[a-zA-Z0-9\-.]+$/;
        const emailRule1 = /^[^.].+[^.]$/;
        const emailRule2 = /^.*[^.]@[^.].*$/;

        let emailValid = (
            emailParts.length === 2 &&
            usernameRule.test(username) &&
            usernameRule.test(domain) &&
            domain.includes('.') &&
            emailRule1.test(email) &&
            emailRule2.test(email)
        );

        const passwordRule1 = /^[a-zA-Z0-9]{8,}$/;
        const passwordRule2 = /[a-z]/;
        const passwordRule3 = /[A-Z]/;
        const passwordRule4 = /[0-9]/;

        let passwordValid = (
            passwordRule1.test(password) &&
            passwordRule2.test(password) &&
            passwordRule3.test(password) &&
            passwordRule4.test(password)
        );
        let repeatPasswordValid = password === repeatPassword;
        if (emailValid && passwordValid && repeatPasswordValid) {
            postResponseRegister(email, password).then(value => {
                if(value) {
                    if(value.error) return this.props.forSetError(value.error);
                    this.setState({isAlreadyRegValid: true})
                } else {this.setState({successRegValid: true})}
            });
        }
        this.setState({
            email: "", password: "", repeatPassword: "",
            emailValid, passwordValid, repeatPasswordValid,
        });
    }

    onChange = (field, value) => {
        this.setState({[field]: value})
    }

    render() {
        if (this.props.error) {return <Redirect to="/error" />}
        const {email, password, repeatPassword, successRegValid, isAlreadyRegValid, emailValid, passwordValid, repeatPasswordValid} = this.state;

        return (
            <div className="containerReg">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <h1 className="register">Register</h1>
                        <p className="register">Please fill in this form to create an account</p>
                        <div id="result">
                            {successRegValid ? <h1 className="resultRegister">
                                Registration was successful. Go to the SignIn form
                            </h1> : isAlreadyRegValid ? <h1 className="resultRegister">
                                User already exists. Go to the SignIn form
                            </h1> : null}
                        </div>
                        <hr/>

                        <Input
                            label="Email"
                            type="text"
                            name="email"
                            value={email}
                            valid={emailValid}
                            invalidText=" *Incorrect entered email. Please make sure that entered password have at least 8 characters, including numbers, lowercase, and uppercase letters*"
                            placeholder="Enter Email"
                            onChange={this.onChange}
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            valid={passwordValid}
                            invalidText=" *Incorrect entered password.Please make sure that entered password have at least 8 characters, including numbers, lowercase, and uppercase letters*"
                            placeholder="Enter Password"
                            onChange={this.onChange}
                        />
                        <Input
                            label="Email"
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            valid={repeatPasswordValid}
                            invalidText=" *Incorrect entered password.Please make the entered passwords are the same*"
                            placeholder="Enter Password Again"
                            onChange={this.onChange}
                        />

                        <hr/>
                    </div>
                    <Link to='/login'>
                        <button type="button" className="loginbtn">Sign in</button>
                    </Link>
                    <button type="submit"
                            className="registerbth"
                    >Register
                    </button>

                </form>
            </div>
        )
    }
}

Register = connect(
    (state) => {return {error: state.rootReducers.toolkit.error}},
    {forSetError}
)(Register);
