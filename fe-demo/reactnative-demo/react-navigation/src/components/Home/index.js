import React from 'react';
import {View,Button} from 'react-native';

export default class Home extends React.Component{
    static navigationOptions = {
        title:'Home'
    };
    _navigate(path){
        this.props.navigation.navigate(path);
    }
    render(){
        return (
            <View>
                <Button title="Nesting navigation" onPress={this._navigate.bind(this,'NestingNavigation')} />
            </View>
        );
    }    
}