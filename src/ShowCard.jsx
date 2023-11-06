/* eslint-disable react/prop-types */
import "./ShowCard.css"
import moment from "moment-timezone"
import { useState } from "react"

function ShowCard(props) {
  const date = props.session.zonedStartTime.dateTime.split("T")
  date[0].split("-")
  const bookinginfo = props.session.bookingInfo

  // Make a state for position in wailist
  const [posInWaitList, setWaitList] = useState(0)

  //Check if already booked
  const [isBooked, setIsBooked] = useState(false)

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
  function handleClick(key) {
    if (key.match("unbook")) {
      setIsBooked(false)
      if (bookinginfo.waitingListCount > 0) {
        bookinginfo.waitingListCount -= 1
        setWaitList(0)
      }
      if (availability) {
        bookinginfo.bookedCount -= 1
      }
    } else {
      setIsBooked(true)
      if (bookinginfo.waitingListCount > 0) {
        bookinginfo.waitingListCount += 1
        setWaitList(bookinginfo.waitingListCount)
        return
      }
      bookinginfo.bookedCount += 1
    }
  }
  // I have added some unneccessary functionality because I can
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
      <p>
        Antall plasser: {bookinginfo.capacity} Ledige plasser:{" "}
        {bookinginfo.capacity - bookinginfo.bookedCount}
      </p>
      {bookinginfo.waitingListCount > 0 && (
        <p>Venteliste: {bookinginfo.waitingListCount}</p>
      )}
      {posInWaitList > 0 && <p>Din plass i ventelisten: {posInWaitList}</p>}
      {isBooked ? (
        <button
          onClick={() => handleClick("unbook")}
          className='unbooking-button'
        >
          Unbook
        </button>
      ) : (
        <button
          key='book'
          onClick={() => handleClick("book")}
          className='booking-button'
        >
          Book
        </button>
      )}
    </div>
  )
}

export default ShowCard
