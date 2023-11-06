/* eslint-disable react/prop-types */
import "./ShowCard.css"
import moment from "moment-timezone"

function ShowCard(props) {
  const date = props.session.zonedStartTime.dateTime.split("T")
  date[0].split("-")
  const bookinginfo = props.session.bookingInfo

  // Check availability
  let availability = true
  if (bookinginfo.capacity <= bookinginfo.bookedCount) {
    availability = false
  }

  // Check current timezone
  let currentTimeZone = false
  if (moment.tz.guess().match(props.session.zonedStartTime.timeZone)) {
    currentTimeZone = true
  }

  const months = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
  ]

  return (
    <div className='card-container'>
      <h2>{props.session.name}</h2>
      <h3>{props.session.clubName}</h3>
      <p>{props.session.durationInMinutes} min</p>
      <p>
        Den {date[0][2]}.{months[parseInt(date[0][2])]} klokken{" "}
        {date[1].substring(0, 5)}
      </p>
      {!currentTimeZone && (
        <p className='warning'>WARNING: You may be in another timezone</p>
      )}
      <p>Instruktør: {props.session.instructor}</p>
      <p>Instruktørnavn</p>
      <p>
        Antall plasser: {bookinginfo.capacity} Ledige plasser:{" "}
        {bookinginfo.capacity - bookinginfo.bookedCount}
      </p>
      {bookinginfo.waitingListPosition > 0 && (
        <p>Venteliste: {bookinginfo.waitingListCount}</p>
      )}
      <button disabled={!availability} className='booking-button'>
        Book now
      </button>
    </div>
  )
}

export default ShowCard
