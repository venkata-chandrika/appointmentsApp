// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStarBtnClicked: false,
  }

  onAddBtn = event => {
    event.preventDefault()
    const {title, date, appointmentList} = this.state
    const newAppointment = {
      id: v4(),
      isClicked: false,
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
    console.log(appointmentList)
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isClicked: !eachList.isClicked}
        }
        return eachList
      }),
    }))
  }

  titleInput = event => {
    this.setState({
      title: event.target.value,
    })
    console.log(event.target.value)
  }

  dateInput = event => {
    this.setState({
      date: event.target.value,
    })
    console.log(event.target.value)
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isStarBtnClicked} = this.state

    if (isStarBtnClicked) {
      return appointmentList.filter(eachList => eachList.isClicked === true)
    }
    return appointmentList
  }

  onClickStarBtn = () => {
    const {isStarBtnClicked} = this.state
    this.setState({
      isStarBtnClicked: !isStarBtnClicked,
    })
  }

  render() {
    const {title, date, isStarBtnClicked} = this.state
    const starClassName = isStarBtnClicked ? 'star-filled-btn' : 'btn-starred'
    const filteredList = this.getFilteredAppointmentList()
    return (
      <div className="app-container">
        <div className="appointment">
          <div className="app-img-container">
            <form className="form" onSubmit={this.onAddBtn}>
              <h1>Add Appointment</h1>
              <label htmlFor="titleInput">TITLE</label>
              <br />
              <input
                className="input"
                type="text"
                id="titleInput"
                value={title}
                onChange={this.titleInput}
              />
              <label htmlFor="dateInput">DATE</label>
              <br />
              <input
                type="date"
                id="dateInput"
                className="input"
                onChange={this.dateInput}
                value={date}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="header-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`{btn ${starClassName}}`}
              onClick={this.onClickStarBtn}
            >
              Starred
            </button>
          </div>
          <ul className="filtered-list-container">
            {filteredList.map(eachList => (
              <AppointmentItem
                appointmentDetails={eachList}
                key={eachList.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
