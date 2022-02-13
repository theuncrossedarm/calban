import Kanban from "./Kanban";
import NavBar from "./NavBar";
import React, {useState} from 'react';
import './styles.css'

function App() {

  const [view, setView] = useState(<Kanban />)

  return (
    <div className="app">
      <NavBar setView={setView} />
      {view}
    </div>
  )
}

export default App;
