import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import "../css/Home.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import UploadPictures from "../accessory/UploadPictures";
import UploadVideo from "../accessory/UploadVideo";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://127.0.0.1:8000";
const server = "http://122.51.228.166:8000";
const ariaLabel = { "aria-label": "description" };
export default function MissionDetail() {
  const [checked, setChecked] = React.useState([0]);
  const [username, setUsername] = useState(cookie.load("username"));
  const [mid, setMid] = useState(window.location.href.split("/")[4]);
  const [flag, setflag] = useState(false);
  async function getmissioninfo() {}
  const [leftData, setleftData] = useState([]);
  const [rightData, setrightData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  const [selectedtags, setselectedtags] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      selectedtags.push(value);
      console.log("???");
    } else {
      newChecked.splice(currentIndex, 1);
      console.log("??????");
      selectedtags.forEach(function(item, index, arr) {
        if (item === value) {
          arr.splice(index, 1);
        }
      });
    }
    console.log("??????");
    console.log(value);
    // selectedtags.push(value)
    setChecked(newChecked);
  };
  async function getpictures() {
    let res = await axios.post(`${server}/getpictures/`, { mid: mid });
    setleftData(res.data);
  }
  // getpictures()
  // console.log(tag);
  useEffect(() => {
    getpictures();
  }, []);
  const handleleft = (e) => {
    console.log(leftData);
    console.log(e.target);
    leftData.forEach(function(item, index, arr) {
      if (item.img === e.target.src) {
        console.log(item);
        rightData.push(arr.splice(index, 1)[0]);
      }
    });
    console.log(rightData);
    if (flag) setflag(false);
    else setflag(true);
  };
  const handleright = (e) => {
    console.log(rightData);
    console.log(e.target);
    rightData.forEach(function(item, index, arr) {
      if (item.img === e.target.src) {
        console.log(item);
        leftData.push(arr.splice(index, 1)[0]);
      }
    });
    console.log(leftData);
    if (flag) setflag(false);
    else setflag(true);
  };
  // console.log(leftData);
  const handletagchange = (e) => {
    setTag(e.target.value);
    // console.log(tag)
  };
  const handleaddtag = () => {
    console.log(tag);
    tags.push(tag);
    setOpen(false);
    setTag("");
  };
  const handleselecttag = (e) => {
    selectedtags.push(e.target.value);
  };
  const navigate = useNavigate();
  const handleannotate = () => {
    cookie.remove("tag");
    cookie.save("tag", selectedtags);
    cookie.remove("images");
    cookie.save("images", rightData);
    cookie.remove("mid");
    cookie.save("mid", mid);
    navigate("/annotate");
  };
  async function handinmission() {
    let data = {
      mid: mid,
      tags: selectedtags,
      images: rightData,
    };
    let res = await axios.post(`${server}/handinmission/`, data);
    if (res.data === "????????????") {
      alert("????????????");
      window.location.href = "/home/";
    }
  }
  const handlemission = () => {
    if (rightData.length>0 && selectedtags.length>0) {

      console.log(selectedtags);
      console.log(rightData);
      handinmission()
    } else alert("??????????????????TAG????????????");
  };
  console.log(selectedtags);
  return (
    <div className="homewrapper">
      <div>
        <h1>??????????????????:{mid}</h1>
        <UploadPictures mid={mid} />
        <UploadVideo mid={mid} />
        <div className="picturelist">
          <div className="pictures">
            <h3>????????????</h3>
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {leftData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}`}
                    srcSet={`${item.img}`}
                    // alt={item.title}
                    loading="lazy"
                    onClick={handleleft}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          <div className="pictures">
            <h3>????????????</h3>
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {rightData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}`}
                    srcSet={`${item.img}`}
                    // alt={item.title}
                    loading="lazy"
                    onClick={handleright}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
        <div className="tagbuttion">
          <Button variant="contained" onClick={handleClickOpen}>
            ??????tag
          </Button>
          {/* <Link to='/annotate' state={{tags:{tags}}}> */}
          {/* <Button variant="contained" onClick={handleannotate}>
              ????????????
            </Button> */}
          <Button variant="contained" onClick={handlemission}>
            ????????????
          </Button>
          {/* </Link> */}
        </div>

        <div className="tag">
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>??????tag</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ?????????????????????????????????Tag??????????????????????????????
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="tag"
                label="Tag"
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={handletagchange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>??????</Button>
              <Button onClick={handleaddtag}>??????</Button>
            </DialogActions>
          </Dialog>
          <div>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {tags.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    value={value}
                    secondaryAction={
                      <Button
                        value={value}
                        onClick={(e) => {
                          console.log(e.target.value);
                          tags.forEach(function(item, index, arr) {
                            if (item === e.target.value) {
                              arr.splice(index, 1);
                            }
                          });
                          selectedtags.forEach(function(item, index, arr) {
                            if (item === e.target.value) {
                              arr.splice(index, 1);
                            }
                          });
                          if (flag) setflag(false);
                          else setflag(true);
                        }}
                      >
                        ??????
                      </Button>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}
