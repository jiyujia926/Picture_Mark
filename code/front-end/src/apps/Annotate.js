import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactImageAnnotate from "react-image-annotate";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://122.51.228.166:8000";
export default function Annotate() {
  const [username, setusername] = useState(cookie.load("username"));
  const [mid, setmid] = useState(window.location.href.split("/")[4]);
  const [images, setimages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [description, setDescription] = useState();
  const [tags,settags] = useState();
  const [loading,setloading]=useState(true)
  const [alltrue,setalltrue]=useState(false)
  //   const [info,setinfo] = useState([])
  useEffect(
    ()=>{
      getdata();
      console.log(description)
      console.log(images)
      console.log(tags)
    }
  ,[])
  // getdata()
  async function getdata() {
    let data = {
      mid: mid,
      username:username
    };
    let res = await axios.post(`${server}/getdata/`, data);
    // console.log(res.data)
    setDescription(res.data.description)
    setimages(res.data.images)
    settags(res.data.tags)
    setloading(false)
    // alert("1");

  }
  async function upload(info) {
    let data = {
      username: username,
      mid: mid,
      images: images,
      info: info,
    };
    let res = await axios.post(`${server}/annotate/`, data);
    if (res.data === "保存成功") {
      alert(res.data)
      window.location.href = "/home/"
    }
  }
  const handleExit = (data) => {
    // console.log(data.images[0].regions);
    console.log(data.images[0].regions);
    var info = [];
    for (var i = 0; i < images.length; i++) {
      if (data.images[i].regions) info.push(data.images[i].regions);
      else info.push([]);
    }
    upload(info);
  };
  const handleNext = () => {
    if (selectedImage === images.length - 1) return;
    setSelectedImage(selectedImage + 1);
  };
  const handlePrev = () => {
    if (selectedImage === 0) return;
    setSelectedImage(selectedImage - 1);
  };
  // console.log(cookie.load('tag'))
  //   console.log(mid);
  return (
    <>
    {loading? (<h1>loading</h1>) : (
            <ReactImageAnnotate
              selectedImage={selectedImage}
              taskDescription={description}
              images={images}
              regionClsList={tags}
              enabledTools={["create-box", "create-polygon"]}
              // showPointDistances={true}
              onNextImage={handleNext}
              hideClone={true}
              hideSettings={true}
              // hideSave={true}
              // hidePrev={true}
              // hideHeaderText={true}
              onPrevImage={handlePrev}
              onExit={handleExit}
            />)}
    </>
      
    );
    
    
}
