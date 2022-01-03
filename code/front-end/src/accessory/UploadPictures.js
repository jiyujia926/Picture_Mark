import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import propTypes from "prop-types";
import axios from "axios";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
const server = "http://122.51.228.166:8000";
const Input = styled('input')({
    display: 'none',
  });
export default function UploadPictures(props) {
  const [files,setfiles]=React.useState([])
  const [mid,setMid]=React.useState(props.mid)
  const handleFile = (e) => {
    console.log(e.currentTarget.files);
    setfiles(e.currentTarget.files)
    upload(e.currentTarget.files)
  };
  async function upload(file) {
      var formdata = new FormData();
      console.log(mid)
      formdata.append("mid",mid)

      for (let i = 0;i<file.length;i++) {
          formdata.append(file[i].name,file[i])
      }
      
      let res1 = await axios.post(`${server}/uploadpictures/`,formdata)
      let res = await axios.post(`${server}/bindpicturesandmid/`,{picturelist:res1.data,mid:mid})
      if (res.data==="上传成功") {
          alert("上传成功")
          window.location.href = window.location.href
      }
      
  }
  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFile}/>
      <Button variant="contained" component="span" >
        上传图片
      </Button>
    </label>
    
  );
}
UploadPictures.propTypes = {
  mid:propTypes.string
}