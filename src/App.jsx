import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <div className=" text-black" style={{backgroundImage: 'linear-gradient(to right, #f4e7ff, #a77ed6)'}}>
      <Outlet/>
    </div>
  )
}

export default App
