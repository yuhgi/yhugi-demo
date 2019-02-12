import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import Content from '@/components/Content';

export default class Business extends React.Component{
    render(){
        return (
            <div className="app">
                <Header activeMenu="business" />
            </div>
        );
    }
}