import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import "../css/Login.css"

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
const server = 'http://122.51.228.166:8000'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:""
        }
        this.change = this.change.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    change(key,e) {
        this.setState({
            [key]:e.target.value
        })
    }
    async handleLogin(e){
        e.preventDefault()
        let data={...this.state}
        console.log(data)
        let res = await axios.post(`${server}/login/`,data)
        // console.log(res)
        if (res.data == "密码正确")
            window.location.href="http://127.0.0.1:3000/home"
        else
            alert("密码错误或未注册！")
    }
    render(){
        return(
            <div className="container">
                <div className="login-wrapper">
                    <div className="header">用户登录</div>
                    <form className="form-wrapper" onSubmit={this.handleLogin}>
                        <input type="text" name="username" placeholder="请输入用户名" className="input-item" onChange= {e=>(this.change('username',e))}/>
                        <input type="password" name="password" placeholder="请输入密码" className="input-item" onChange={e=>(this.change('password',e))}/>
                        <input type="submit" name="submit" value="登录" className="btn"/>
                    </form>

                </div>
            </div>
        )
    }
}
export default Login