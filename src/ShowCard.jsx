import "./ShowCard.css"
function ShowCard(props) {
  return (
    <div className='card-container'>
      <h2>Timenavn</h2>
      <p>Varighet</p>
      <p>Dato og tidspunkt</p>
      <p>Instruktørnavn</p>
      <p>Instruktørnavn</p>
      <button className='booking-button'>Book now</button>
    </div>
  )
}

export default ShowCard
