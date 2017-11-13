import React from 'react';
import { View, Text, Button } from 'react-native';

class Chat extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${navigation.state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
                />
            )
        }
    }; 
    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

export default Chat;