import React, { Component} from 'react'
import {connect} from 'react-redux'
import Cell from "./Cell";
import moment from "moment";
import FormAddNewEvent from "./FormAddNewEvent";
import {Redirect} from "react-router-dom";
import Event from "./Event";
import {forSetError, setStartEvents, addNewEvent, forRemoveEvent, forEditEvent, forSetEdit} from "../store/reducers";

let cells = [];
const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events,
            currentData: moment(),
            edit: this.props.edit,
            currentMonth: 1,
            currentYear: 0
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.events !== prevProps.events) {
            this.setState({events: [...this.props.events]})
        }
        if (this.props.edit !==prevProps.edit) {
            this.setState({edit: this.props.edit})
        }
    }

    onClickLeft = () => {
        this.setState(({currentData}) => {
            return {
                currentData: currentData.subtract(1, 'month')
            }
        })
    }

    onClickRight = () => {
        this.setState(({currentData}) => {
            return {
                currentData: currentData.add(1, 'month')
            }
        })
    }

    onClick = (newCurrent) => {
        const {currentData} = this.state
        if (Number(currentData.format('DD')) > 0 && Number(currentData.format('DD')) <= 31) {
            this.setState(({currentData}) => {
                return {
                    currentData: currentData.subtract(currentData.format('DD'), 'days').add(newCurrent, 'days')
                }
            })
        }
    }

    render() {
        if (this.props.error) {return <Redirect to="/error"/>}
        if (this.props.logger === false) {return <Redirect to="/login"/>}
        const {currentData, events, email, edit} = this.state;

        return (
            <div className="calendarApp">
                <div className="container">
                    <h1 className="events">Events<br/> {'(' + currentData.format('YYYY') + ')'}</h1>
                    <hr/>

                    <div className="nameOfMonth">
                        <div className="tr-left" onClick={this.onClickLeft}/>
                        <label className="month">
                            <b>{currentData.format('MMMM')}</b>
                        </label>
                        <div className="tr-right" onClick={this.onClickRight}/>
                    </div>

                    <hr/>

                    <div className="calendar">
                        {weekDays.map((cell, index) => {
                            setCalendar(currentData)
                            return <Cell number={cell} key={cell} events={0}/>
                        })}
                        {cells.map((item) => {
                            let countEvents = 0;
                            if (!(item[0] === "")) {
                                events.map(value => {
                                    let data = moment(currentData).subtract(currentData.format('DD'), 'days').add(item[0], 'days');
                                    if (data.format('L') === value.day) {
                                        countEvents++
                                    }
                                })
                            }
                            (item[0] === Number(currentData.format('DD'))) ? item[1] = true : item[1] = false;

                            return <Cell
                                number={item[0]}
                                selected={item[1]}
                                events={countEvents}
                                onClick={this.onClick}
                            />
                        })}
                    </div>
                </div>
                <hr/>
                <div className="eventsList">
                    <h1 className="addNew">+</h1>
                    <FormAddNewEvent
                        email={email}
                        events={events}
                        day={currentData.format('L')}
                    />
                    {this.state.events.map(item => {
                        if (currentData.format('L') === item.day) {
                            return <Event
                                day={item.day}
                                time={item.time}
                                text={item.text}
                                allEvents={[...events]}
                                email={email}
                                edit={edit}
                            />;
                        }
                    })}
                </div>
            </div>
        )
    }
}

Main = connect(
    (state) => {
        return {
            logger: state.rootReducers.toolkit.logger,
            error: state.rootReducers.toolkit.error,
            email:state.rootReducers.toolkit.email,
            events:state.rootReducers.toolkit.events,
            edit: state.rootReducers.toolkit.edit
        }
    },
    {setStartEvents, addNewEvent, forRemoveEvent, forEditEvent, forSetEdit, forSetError}
)(Main);



function setCalendar(data) {
    let thisMonth = (data.get('month')+1).toString();
    if (thisMonth.length === 1) {thisMonth = '0' + thisMonth}
    let thisYear = (data.get('year')).toString();
    for (let i = 1; i<=35; i++) {
        let k = i - Number(moment(thisYear + thisMonth + '01').get('day')) + 1;

        if (k > 0 && k<=Number(data.daysInMonth())) {
            cells[i-1] = [k, false];
        } else {
            cells[i-1] = ["", false];
        }
    }
}
