import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';

export default class My extends React.Component{
    renderHeader(){
        return <Header activeMenu="my" />;
    }
    renderLeft(){
        return <div>left</div>
    }
    renderContent(){
        return <div>content</div>
    }
    render(){
        return (
            <Layout 
                header={this.renderHeader()}
                left={this.renderLeft()}
                content={this.renderContent()}
            />
        );
    }
}