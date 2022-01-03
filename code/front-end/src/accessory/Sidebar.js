import React from "react";
import Circle from "../apps/Draw";
import Drawboard from "../apps/Drawboard";
// import '../css/Sidebar.css'
export default class Sidebar extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="page">
                <div className="sidebar">
                <header>功能</header>
                <a href="">
                    <span>选择</span>
                </a>
                <a href="">
                    <span>移动</span>
                </a>
                <a href="" >
                    <span>矩形框标注</span>
                </a>
                <a href="">
                    <span>多边形标注</span>
                </a>
                </div>
                <div >
                    {/* <Circle/> */}
                    <Drawboard/>
                </div>
            </div>
            
            
        )
    }
}