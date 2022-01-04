import React, { useState } from "react";
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
