import logo from './logo.svg';
import './App.css';
import React from 'react';
import Register from './apps/Register';
import Login from './apps/Login';
import Home from './apps/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      
    )
  }
}

export default App;
