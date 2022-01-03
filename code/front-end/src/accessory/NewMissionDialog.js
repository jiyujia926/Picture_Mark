import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import axios from 'axios';
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://122.51.228.166:8000";

export default function NewMissionDialog() {
  const [open, setOpen] = React.useState(false);
  const [username,setUsername] = React.useState(cookie.load('username'))
  const [missionname,setMissionname] = React.useState()
  const [missiondescription,setMissiondecription]=React.useState()
  const handlename = (e) => {
    //   console.log(e.target.value)
      setMissionname(e.target.value)
    //   console.log(missionname)
  }
  const handlemissiondescription = (e) => {
    //   console.log(e.target.value)
      setMissiondecription(e.target.value)
    //   console.log(missiondescription)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNew = () => {
    console.log(missionname)
    console.log(missiondescription)
    console.log(username)
    newmission()
  }
  async function newmission() {
    let data = {
        User:username,
        MissionName:missionname,
        MissionDescription:missiondescription
    }
    let res = await axios.post(`${server}/newmission/`,data)
    if (res.data==="创建成功") {
        setOpen(false)
        alert("创建成功")
        window.location.href=window.location.href
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        新建标注标注
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新建标注任务</DialogTitle>
        <DialogContent>
          <DialogContentText>
            在下面填写标注的基本信息以创建新的标注任务
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="标注任务名称(必填)"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlename}
            required
          />
          <TextField
            margin='dense'
            id="description"
            label="标注任务描述"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlemissiondescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleNew}>新建</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
NewMissionDialog.propTypes = {
    user: PropTypes.string
}