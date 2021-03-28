import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import ReactDom from "react-dom";
import {setEvents} from "../store/actions";
import {connect} from 'react-redux'

let email;
let password;

export default class SignIn extends Component {

    onSubmit = (e) => {
        postResponse().then(value => {
            if (value.email && value.password) {
                this.props.dispatch(setEvents({email: email.value, events: [...value.events]}))
            }
            if (!value.email) {
                ReactDom.render(
                    <h1 className="incorrectEnteredData">User does not exist, please register</h1>,
                    document.getElementById('incorrectEmail')
                )
            }
            if (!value.password) {
                ReactDom.render(
                    <h1 className="incorrectEnteredData">Incorrect entered password</h1>,
                    document.getElementById('incorrectPassword')
                )
            }

            if (value===false) {
                Error("Error")
            }
        }, reason => {
            console.log("wtf: ", reason)
            Error(reason)
        })

        e.preventDefault();
    }

    inputEmail = (node) => email = node
    inputPassword = (node) => password = node

    render() {
        if (this.props.logger === true) {return <Redirect to="/" />}
        else return (
            <div className="containerReg">
                <form onSubmit={this.onSubmit}>
                    <div >
                        <h1 className="signIn">Sign In</h1>
                        <p className="signIn">Please fill in this form to sign in an account</p>
                        <div id="result">
                        </div>
                        <hr/>

                        <label className="email"><b>Email</b></label>
                        <div id="incorrectEmail">
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="psw"
                            ref={this.inputEmail}
                            required
                        />
                        <label className="email"><b>Password</b></label>
                        <div id="incorrectPassword">
                        </div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="psw-repeat"
                            ref={this.inputPassword}
                            required
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

SignIn = connect()(SignIn);

async function postResponse() {
    try {
        let res = await fetch("/signIn", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

function Error(massage) {
    ReactDom.render(
        <h1 className="resultRegister">
            Something is not work, please reload the page<br/>
            Error: {massage}
        </h1>,
        document.getElementById('result')
    )
}