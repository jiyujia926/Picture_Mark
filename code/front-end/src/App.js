import logo from './logo.svg';
import './App.css';
import React from 'react';
import Register from './apps/Register';
import Login from './apps/Login';
import Home from './apps/Home';
import Annotate from './apps/Annotate';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import MissionDetail from './apps/MissonDetail';
import CheckAnnotation from './apps/CheckAnnotation';
import AnnotationList from './apps/Annotaionlist';
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/annotate/:mid" element={<Annotate/>}/>
            <Route path="/mission/:mid" element={<MissionDetail />}/>
            <Route path="/check/:mid/:username" element={<CheckAnnotation />}/>
            <Route path="/annotationlist/:mid" element={<AnnotationList />}/>
        </Routes>
      </BrowserRouter>
      
    )
  }
}

export default App;
