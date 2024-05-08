import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  //! Important: State to determine if a user is already logged on or not if page refreshes for some reason
const [loggedIn, setLoggedIn] = useState(false)  


useEffect(() => {
  // Logic to determine if user is logged on or not
const loggedInOrNot = localStorage.getItem("user")
if (loggedInOrNot) {
  setLoggedIn(() => true)
} else {
  setLoggedIn(() => false)
}



}, [])

  return (
    <div>
    <NavBar loggedIn={loggedIn}/>
    <Outlet context={[loggedIn, setLoggedIn,]}/>
    </div>
    
  );
}

export default App;
