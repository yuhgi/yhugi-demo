import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

export default class Business extends React.Component{
    render(){
        return (
            <div className="layout">
                <div className="layout-header">
                    {this.props.header}
                </div>
                <div className="layout-body">
                    <div className="layout-leftcontent">
                        {this.props.left}
                    </div>
                    <div className="layout-maincontent">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

Business.propTypes = {
    header:PropTypes.element.isRequired,  // 头部
    left:PropTypes.element.isRequired, // 左侧
    content:PropTypes.element.isRequired // 主题内容
};