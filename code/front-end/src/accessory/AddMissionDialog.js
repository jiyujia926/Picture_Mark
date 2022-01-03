import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import cookie from 'react-cookies'
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000"
export default function AddMissionDialog() {
  const [open, setOpen] = React.useState(false);
  const [username,setUsername] = React.useState(cookie.load('username'))
  const [mid,setMid]=React.useState()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlemid = (e) => {
    setMid(e.target.value)
  }
  const handleadd = () => {
    console.log(mid)
    addmission()
  }
  async function addmission() {
    let data = {
      User:username,
      Mid:mid
    }
    let res = await axios.post(`${server}/addmission/`,data)
    if (res.data==="添加成功")
    {
      setOpen(false)
      alert("添加成功")
      window.location.href=window.location.href
    }
    else 
    {
      setOpen(false)
      alert(res.data)
      window.location.href=window.location.href
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        添加标注任务
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>添加标注任务</DialogTitle>
        <DialogContent>
          <DialogContentText>
            输入标注的编码添加标注任务
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mid"
            label="标注任务编码"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlemid}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleadd}>添加</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
