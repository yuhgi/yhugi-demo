import React from 'react';
import {  View } from 'react-native';

export default class SizeFixedDemo extends React.Component {
    static navigationOptions = {
        title:'Size Fixed Demo'
    };
    render() {
        return (
            <View>
                <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
                <View style={{ width: 100, height: 100, backgroundColor: 'skyblue' }} />
                <View style={{ width: 150, height: 150, backgroundColor: 'steelblue' }} />
            </View>
        );
    }
}