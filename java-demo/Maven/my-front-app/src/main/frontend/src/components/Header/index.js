import React from 'react';
import {Link} from 'react-router-dom';

import './index.less';

export default class Header extends React.Component{
    render(){
        return (
            <div className="app-header">
                <ul>
                    <li><Link to="/business">门店运营</Link></li>
                    <li><Link to="/oa">在线办公</Link></li>
                    <li><Link to="/report">报表中心</Link></li>
                    <li><Link to="/my">我的面板</Link></li>
                    <li><Link to="/config">系统配置</Link></li>
                </ul>
            </div>
        );
    }
}