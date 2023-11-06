import "./App.css"
import ShowCard from "./ShowCard"
import data from "./data/response.json"

function App() {
  return (
    <>
      <div className='grid-box'>
        {data.results.map((session) => {
          return <ShowCard key={session.id} session={session}></ShowCard>
        })}
      </div>
    </>
  )
}

export default App
