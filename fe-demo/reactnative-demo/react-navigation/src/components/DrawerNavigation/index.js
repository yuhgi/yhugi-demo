import React from 'react';
import {View,Text} from 'react-native';


export default class DrawerNavigation extends React.Component{
    static navigationOptions={
        title:'NestingNavigation'
    }
    render(){
        return (
            <View>
                <Text>DrawerNavigation</Text>
            </View>
        )
    }
}