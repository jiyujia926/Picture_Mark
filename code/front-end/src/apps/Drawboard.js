import React, { Component } from "react";
import "../css/Drawboard.css"
import Annotate from "./Annotate";
class Drawboard extends React.Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef();
        this.draw = this.draw.bind(this)
    }
    draw = ()=> {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 1920;
        canvas.height = 1080;
        ctx.clearRect(0,0,window.innerWidth,canvas.innerHeight)
        ctx.beginPath();
        ctx.rect(150,0,canvas.width,canvas.height)
        ctx.closePath()
        ctx.fillStyle = "white";
        ctx.fill()
    }
    componentDidMount(){
        // const canvas = this.canvas.current;
        // const ctx = canvas.getContext("2d");
        // canvas.addEventListener('mousedown',this.handleMousedown)
        this.draw()
    }
    render() {
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
                <div className="container">
                    {/* <Circle/> */}
                    <canvas ref={this.canvas}></canvas>
                    {/* <Annotate/> */}
                </div>
            </div>
        ) 
    }
}
export default Drawboard