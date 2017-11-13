import React from 'react';
import { View, Text ,Button } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Chat from './Chat';

class RecentChats extends React.Component {
    static navigationOptions = {
        title:'Recent Chats'
    }
    render() {
        const {navigate,goBack} = this.props.navigation;
        console.log(this.props.navigation)
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button title="Chat with Lucy" onPress={() => {navigate('Chat',{user:'Lucy'});}} />
                <Button title="Back Home" onPress={() => {goBack('DrawerNavigation');}} />
            </View>
        );
    }
}

class AllContacts extends React.Component {
    static navigationOptions = {
        title:'All Chats'
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button title="Chat with Jane" onPress={() => {navigate('Chat',{user:'Jane'})}} />
            </View>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    Rencent:{
        screen:RecentChats
    },
    All:{
        screen:AllContacts
    }
});

const NestingNavigator = StackNavigator({
    ChatRoom:{
        screen:MainScreenNavigator
    },
    Chat:{
        screen:Chat
    }
})

export default NestingNavigator;