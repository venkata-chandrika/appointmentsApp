// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isClicked} = appointmentDetails
  const starOrFilledImage = isClicked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starBtn = () => {
    toggleStar(id)
  }
  return (
    <li className="list-container">
      <div className="title-btn-container">
        <p>{title}</p>
        <button
          type="button"
          onClick={starBtn}
          className="star-btn"
          data-testid="star"
        >
          <img src={starOrFilledImage} alt="star" />
        </button>
      </div>

      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
