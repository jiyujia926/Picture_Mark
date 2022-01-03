import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import "../css/Register.css"
import { Navigate } from "react-router";

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
// const server = 'http://122.51.228.166:8000'
const server ='http://127.0.0.1:8000'

class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:"",
            repassword:"",
            emailaddress:"",
            telephone:"",
            isregisteredflag:false
        }
        this.change = this.change.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    change(key,e) {
        this.setState({
            [key]:e.target.value
        })
    }
    async handleSubmit(e){
        e.preventDefault()
        let data = {
            username:this.state.username,
            password:this.state.password,
            emailaddress:this.state.emailaddress,
            telephone:this.state.telephone
        }
        console.log(data)
        let res = await axios.post(`${server}/register/`,data)
        console.log(res)
        this.setState({isregisteredflag:!this.state.isregisteredflag})

    }
    render()
    {
        if (this.state.isregisteredflag)
            return (<Navigate to='/'/>)
        return (
            // <div className = "Register">
            //     <div className = "Register-head">用户注册</div>
            //     <table className = "Register-table">
            //         <tbody>
            //         <tr><td>用户名</td><td><input onChange = {(e) => (this.change('username',e))}/></td><td></td></tr>
            //         <tr><td>密码</td><td><input onChange = {(e) => (this.change('password',e))}/></td><td></td></tr>
            //         <tr><td>重复密码</td><td><input onChange = {(e) => (this.change('repassword',e))}/></td><td>{this.state.password?this.state.password==this.state.repassword?"Yes":"Wrong":""}</td></tr>
            //         <tr><td>邮箱</td><td><input onChange = {(e) => (this.change('emailaddress',e))}/></td><td></td></tr>
            //         <tr><td>手机号</td><td><input onChange = {(e) => (this.change('telephone',e))}/></td><td></td></tr>
            //         </tbody>
            //     </table>
            //     {/* <button onClick = {}></button> */}
            // </div>
            <div className="container">
                <div className="register-wrapper">
                <div className="header">用户注册</div>
                <form className="form-wrapper"  onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="用户名" className="input-item" onChange = {(e) => (this.change('username',e))} required/>
                    <input type="password" name="password" placeholder="密码" className="input-item" onChange = {(e) => (this.change('password',e))} required/>
                    <input type="password" name="repassword" placeholder="请重复输入密码" className="input-item" onChange = {(e) => (this.change('repassword',e))} required/>
                    {this.state.password?this.state.password==this.state.repassword?<div className="right"></div>:<div className="wrong">请重复输入相同的密码</div>:""}
                    <input type="email" name="emailaddress" placeholder="邮箱" className="input-item" onChange = {(e) => (this.change('emailaddress',e))} required/> 
                    <input type="tel" name="telephone" placeholder="手机号" className="input-item" onChange = {(e) => (this.change('telephone',e))} required/> 
                    <input type="submit" name="submit" value="注册" className="btn"/>
                </form>
                </div>
            </div>
        )
    }

}
export default Register