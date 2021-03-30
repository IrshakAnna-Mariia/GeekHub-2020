import React, { Component} from 'react'
import {connect} from 'react-redux'
import Cell from "./Cell";
import moment from "moment";
import FormAddNewEvent from "./FormAddNewEvent";
import {addEvent, setEvents} from "../store/actions";
import {Redirect} from "react-router-dom";
import Event from "./Event";

let cells = [];
const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events,
            current: moment().format('DD'),
            edit: this.props.edit,
            currentMonth: 1,
            currentYear: 0
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.events !== prevProps.events) {
            this.setState({events: [...this.props.events]})
        }
        if (this.props.edit !==prevProps.edit) {
            this.setState({edit: this.props.edit})
        }
    }

    onClickLeft = () => {
        if ((moment().get('month') + this.state.currentMonth-1) === 0) {
            this.setState({currentMonth:  12 - Number(moment().get('month'))})
            this.setState(({currentYear}) => {
                return {
                    currentYear: Number(currentYear) - 1
                }
            })
        } else {
            this.setState(({currentMonth}) => {
                return {
                    currentMonth: Number(currentMonth) - 1
                }
            })
        }
    }

    onClickRight = () => {
        this.setState(({currentMonth}) => {
            return {
                currentMonth: Number(currentMonth) + 1
            }
        })
        if ((12 - (moment().get('month') + this.state.currentMonth)) === 0) {
            this.setState({currentMonth:  1 - Number(moment().get('month'))})
            this.setState(({currentYear}) => {
                return {
                    currentYear: Number(currentYear) + 1
                }
            })
        }
    }

    onClick = (newCurrent) => {
        if (this.state.current > 0 && this.state.current <= 31) {
            this.setState({current: newCurrent})
        }
    }

    render() {
        let monthThis = (Number(moment().get('month'))+Number(this.state.currentMonth)).toString()
        if (monthThis.length === 1) {monthThis = '0' + monthThis}
        let data = this.state.current + "/" +
            (moment(moment().get('year').toString() + monthThis + '01', "YYYYMMDD").get('month') + 1) +
            "/" + (moment().get('year') + this.state.currentYear)
        if (this.props.logger === false) {return <Redirect to="/login" />}
        else return (
            <div className="calendarApp">
                <div className="container">
                    <h1 className="events">Events<br/> {'('+ (moment().get('year')+this.state.currentYear).toString() +')'}</h1>
                    <hr/>

                    <div className="nameOfMonth">
                        <div className="tr-left" onClick={this.onClickLeft}/>
                        <label className="month">
                            <b>{moment(moment().get('year').toString() + monthThis + '01', "YYYYMMDD").format('MMMM')}</b>
                        </label>
                        <div className="tr-right" onClick={this.onClickRight}/>
                    </div>

                    <hr/>

                    <div className="calendar">
                        {weekDays.map((cell, index) => {
                            setCalendar(this.state.currentMonth, this.state.currentYear)
                            return <Cell number={cell} key={cell} events={0}/>
                        })}
                        {cells.map((item) => {
                            let day = item[0] + "/" +
                                (moment(moment().get('year').toString() + monthThis + '01', "YYYYMMDD").get('month')+1) +
                                "/" + (moment().get('year')+this.state.currentYear)
                            ;
                            let countEvents = 0;
                            if (!(item[0] === "")) {
                                this.state.events.map(item => {
                                    if (day === item.day) {
                                        countEvents++
                                    }
                                })
                            }
                            (item[0] === Number(this.state.current)) ? item[1] = true : item[1] = false;

                            return <Cell
                                number={item[0]}
                                selected={item[1]}
                                events={countEvents}
                                onClick = {this.onClick}
                            />
                        })}
                    </div>
                </div>
                <hr/>
                <div className="eventsList">
                    <h1 className="addNew">+</h1>
                    <FormAddNewEvent
                        email={this.props.email}
                        day={data}
                    />
                    {this.state.events.map(item => {
                        let day = this.state.current + "/" +
                            (moment(moment().get('year').toString() + monthThis + '01', "YYYYMMDD").get('month') + 1) +
                            "/" + (moment().get('year')+this.state.currentYear)
                        ;
                        if (day === item.day) {
                            return <Event
                                day={item.day}
                                time={item.time}
                                text={item.text}
                                allEvents={[...this.state.events]}
                                email={this.props.email}
                                edit={this.state.edit}
                            />;
                        }
                    })}
                </div>
            </div>
        )
    }
}

Main = connect()(Main);



function setCalendar(subMonth, subYear) {
    let thisMonth = (Number(moment().get('month'))+Number(subMonth)).toString()
    if (thisMonth.length === 1) {thisMonth = '0' + thisMonth}
    let thisYear = (Number(moment().get('year')) + Number(subYear)).toString();
    for (let i = 1; i<=35; i++) {
        let k = i - Number(moment(thisYear + thisMonth + '01').get('day')) + 1;

        if (k > 0 && k<=Number(moment(thisYear + thisMonth + '01').daysInMonth())) {
            cells[i-1] = [k, false]
        } else {
            cells[i-1] = ["", false]
        }
    }
}
