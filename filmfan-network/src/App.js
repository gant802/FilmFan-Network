import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
const [loggedIn, setLoggedIn] = useState(false)


const userFromStorage = localStorage.getItem("user")
    const userObjFromStorage = JSON.parse(userFromStorage)

useEffect(() => {
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
    <Outlet context={[loggedIn, setLoggedIn]}/>
    </div>
    
  );
}

export default App;
