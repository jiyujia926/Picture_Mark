import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactImageAnnotate from "react-image-annotate";
import Login from "./Login";
import Circle from "./Draw";
import Sidebar from "../accessory/Sidebar";
import cookie from 'react-cookies'
import "../css/Home.css";
import NewMissionDialog from "../accessory/NewMissionDialog";
import AddMissionDialog from "../accessory/AddMissionDialog";
import MissionTable from "../accessory/MissionTable";
import { Button } from "@mui/material";

// class Home extends React.Component{
//     render(){
//         return (
//

//         )
//     }
// }
// export default Home
export default function Home() {
  const [username,setUsername] = useState(cookie.load('username'))
  const logout = () => {
    cookie.remove('username')
    window.location.href = '/'
  }
  return (
    <div className="homewrapper">
      <h1>标注</h1>
      <div>
        <NewMissionDialog/>
        <AddMissionDialog />
        <Button variant="outlined" onClick={logout}>退出当前账户</Button>
      </div>
      <MissionTable />
      
    </div>
  );
}
