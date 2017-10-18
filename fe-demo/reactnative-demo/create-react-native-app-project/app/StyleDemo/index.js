import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Greeting extends React.Component {
    render() {
        let { name, ...others } = this.props;
        return <Text {...others}>Hello {name}</Text>;
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30
    },
    red: {
        color: 'red'
    }    
});


export default class StyleDemo extends React.Component {
    static navigationOptions = {
        title:'Style Demo'
    };
    render() {
        return (
            <View style={styles.container}>
                <Greeting name="Mary" style={styles.red} />
                <Greeting name="Tom" style={styles.bigBlue} />
                <Greeting name="Jerry" style={[styles.bigBlue, styles.red]} />
                <Greeting name="Ben" style={[styles.red, styles.bigBlue]} />
            </View>
        );
    }
}