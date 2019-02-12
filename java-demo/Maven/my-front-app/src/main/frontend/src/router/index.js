import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Login from '@/app/login';
import Business from '@/app/business'; // 门店运营
import OA from '@/app/oa'; // 在线办公
import Report from '@/app/report'; // 报表中心
import My from '@/app/my'; // 我的面板
import Config from '@/app/config'; // 系统配置

export default () => (
    <Router>
        <div className="wrapper">
            <Route exact path="/" component={Login} />
            <Route path="/business" component={Business} />
            <Route path="/report" component={Report} />
            <Route path="/my" component={My} />
            <Route path="/oa" component={OA} />
            <Route path="/config" component={Config} />
        </div>
    </Router>
);