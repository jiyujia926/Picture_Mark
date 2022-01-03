import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactImageAnnotate from "react-image-annotate";
import { useParams } from "react-router-dom";
import cookie from "react-cookies";
import { unstable_extendSxProp } from "@mui/system";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";

export default function CheckAnnotation() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [images,setimages]=useState([])
    const [loading,setloading]=useState(true)
    const [mid, setmid] = useState(window.location.href.split("/")[4]);
    const [description, setDescription] = useState();
    const [tags,settags] = useState();
    const [username, setusername] = useState(window.location.href.split("/")[5]);
    // console.log(mid)
    // console.log(username)
    useEffect(
      ()=>{
        getdata();
        console.log(description)
        console.log(images)
        console.log(tags)
      }
    ,[])
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
    const handleNext = () => {
      if (selectedImage === images.length - 1) return;
      setSelectedImage(selectedImage + 1);
    };
    const handlePrev = () => {
      if (selectedImage === 0) return;
      setSelectedImage(selectedImage - 1);
    };
    const handleExit = (data) => {
      // console.log(data.images[0].regions);
      // console.log(data.images[0].regions);
      window.location.href = '/annotationlist/'+mid
    };
    return (
      <>
      {loading? (<h1>loading</h1>) : (
              <ReactImageAnnotate
                selectedImage={selectedImage}
                taskDescription={description}
                images={images}
                regionClsList={tags}
                enabledTools={[]}
                // showPointDistances={true}
                onNextImage={handleNext}
                hideClone={true}
                hideSettings={true}
                allowComments={false}
                // hideSave={true}
                // hidePrev={true}
                // hideHeaderText={true}
                onPrevImage={handlePrev}
                onExit={handleExit}
              />)}
      </>
    )
}