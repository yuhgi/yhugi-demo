import React from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        };
    }
    onLogin = () => {
        this.setState((prevState,props) => ({
            isLogin:true
        }));
    }
    render() {
        return this.state.isLogin?(
            <Redirect to="/business" />
        ):(
            <div>
                登录页
                <button onClick={this.onLogin}>登录</button>
            </div>
        );
    }
}