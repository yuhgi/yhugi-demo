import React from 'react';
import { View, Button, Text } from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const header = (
            <View>
                <Button onPress={() => {navigation.navigate('NestingNavigation')}}  title="left" />
                <Text>center</Text>
                <Button title="right" />
            </View>
        );
        return {
            header: header,
            title: 'Home'
        };
    };
    _navigate(path) {
        this.props.navigation.navigate(path);
    }
    render() {
        console.log(this.props.navigation);
        return (
            <View>
                <Button title="Nesting navigation" onPress={this._navigate.bind(this, 'NestingNavigation')} />
                <Button title="Drawer navigation" onPress={this._navigate.bind(this, 'DrawerNavigation')} />
                <Button title="EditInfo" onPress={this._navigate.bind(this, 'EditInfo')} />
            </View>
        );
    }
}