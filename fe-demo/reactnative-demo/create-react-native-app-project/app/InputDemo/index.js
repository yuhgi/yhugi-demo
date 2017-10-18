import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    static navigationOptions = {
        title:'Input Demo'
    };
    render() {
        return (
            <View style={{padding:10}}>
                <TextInput style={{height:40}} 
                    placeholder="Type here to translate!"
                    onChangeText={(text) => {this.setState({text});}}
                />
                <Text style={{padding:10,fontSize:42}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join('')}
                </Text>
            </View>
        );
    }
}