import React, { Component} from 'react'
import ReactDom from 'react-dom'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

let email;
let password;
let repeatPassword;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successReg: false,
            isEmailAlreadyReg: false,
            incorrectEmail: false,
            incorrectPassword: false,
            incorrectRepeatPassword: false
        }
    }

    onSubmit = (e) => {
        this.setState({successReg: false});
        this.setState({isEmailAlreadyReg: false});
        this.setState({incorrectEmail: false});
        this.setState({incorrectPassword: false});
        this.setState({incorrectRepeatPassword: false});

        if (checkEmail(email.value)
            && checkPassword(password.value)
                && (repeatPassword.value===password.value)) {
            postResponse().then(value => {
                if(value) {
                    this.setState({isEmailAlreadyReg: true});
                } else {this.setState({successReg: true});}
            });
            email.value = '';
            password.value = '';
            repeatPassword.value = '';
        } else {
            if (!checkEmail(email.value)) {this.setState({incorrectEmail: true});}
            if (!checkPassword(password.value)) {this.setState({incorrectPassword: true});}
            if (!(repeatPassword.value === password.value)) {this.setState({incorrectRepeatPassword: true});}
        }

        e.preventDefault()
    }

    inputEmail = (node) => email = node
    inputPassword = (node) => password = node
    inputRepeatPassword = (node) => repeatPassword = node

    render() {
        return (
            <div className="containerReg">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <h1 className="register">Register</h1>
                        <p className="register">Please fill in this form to create an account</p>
                        <div id="result">
                            {this.state.successReg ? <h1 className="resultRegister">
                                Registration was successful. Go to the SignIn form
                            </h1> : this.state.isEmailAlreadyReg ? <h1 className="resultRegister">
                                User already exists. Go to the SignIn form
                            </h1> : null}
                        </div>
                        <hr/>

                        <label className="email">
                            <b>Email</b>
                            {this.state.incorrectEmail ? <h1 className="incorrectEnteredData">Incorrect entered email</h1> : ""}
                        </label>
                        <div id="incorrectEmail">
                        </div>
                        <input
                            className = {this.state.incorrectEmail ? "wrong": ""}
                            type="text"
                            placeholder="Enter Email"
                            ref={this.inputEmail}
                            required
                        />
                        <label className="email">
                            <b>Password</b>
                            {this.state.incorrectPassword ? <h1 className="incorrectEnteredData">Incorrect entered password. <br/>
                                Please make sure that entered password have at least 8 characters,
                                including numbers, lowercase, and uppercase letters</h1> : null}
                        </label>
                        <div id="incorrectPassword">
                        </div>
                        <input
                            className = {this.state.incorrectPassword ? "wrong": ""}
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            ref={this.inputPassword}
                            required
                        />
                        <label className="email">
                            <b>Repeat password</b>
                            {this.state.incorrectRepeatPassword ? <h1 className="incorrectEnteredData">Incorrect entered password. <br/>
                                Please make the entered passwords are the same</h1> : ""}
                        </label>
                        <div id="incorrectRepeatPassword">
                        </div>
                        <input
                            className = {this.state.incorrectRepeatPassword ? "wrong": ""}
                            type="password"
                            placeholder="Enter Password Again"
                            ref={this.inputRepeatPassword}
                            required/>

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

//SignIn = connect()(SignIn);

function checkEmail(propsEmail) {
    const emailParts = propsEmail.split('@');
    const username = emailParts[0];
    const domain = emailParts[1];
    const usernameRule = /^[a-zA-Z0-9\-.]+$/;
    const emailRule1 = /^[^.].+[^.]$/;
    const emailRule2 = /^.*[^.]@[^.].*$/;

    return (
        emailParts.length === 2 &&
        usernameRule.test(username) &&
        usernameRule.test(domain) &&
        domain.includes('.') &&
        emailRule1.test(propsEmail) &&
        emailRule2.test(propsEmail)
    );
}

function checkPassword(propsPassword) {
    const passwordRule1 = /^[a-zA-Z0-9]{8,}$/;
    const passwordRule2 = /[a-z]/;
    const passwordRule3 = /[A-Z]/;
    const passwordRule4 = /[0-9]/;

    return (
        passwordRule1.test(propsPassword) &&
        passwordRule2.test(propsPassword) &&
        passwordRule3.test(propsPassword) &&
        passwordRule4.test(propsPassword)
    );
}

async function postResponse() {
    try {
        let res = await fetch("/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email: email.value, password: password.value}
            ),
        });
        return await res.json()
    } catch (e) {
        console.log(e)
        ReactDom.render(
            <h1 className="resultRegister">
                Something is not work, please reload the page<br/>
                Error: {e.message}
            </h1>,
            document.getElementById('result')
        )
    }
}
