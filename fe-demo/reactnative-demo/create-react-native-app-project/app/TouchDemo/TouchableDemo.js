import React from 'react';
import {Alert,Platform,StyleSheet,Text,TouchableHighlight,TouchableOpacity,
    TouchableNativeFeedback,TouchableWithoutFeedback,View} from 'react-native';

const styles = StyleSheet.create({
    container:{
        paddingTop:60,
        alignItems:'center'
    },
    button:{
        marginBottom:30,
        width:260,
        alignItems:'center',
        borderRadius:4,
        backgroundColor:'#2196F3'
    },
    buttonText:{
        padding:20,
        color:'white'
    }
});

export default class TouchableDemo extends React.Component{
    static navigationOptions = {
        title:'Touchable Demo'
    };
    _onPressButton(){
        Alert.alert('You tapped the button.');
    }
    _onLongPressButton(){
        Alert.alert('You long-pressed the button.');
    }
    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableHighlight</Text>
                    </View>
                </TouchableHighlight>
                <TouchableOpacity onPress={this._onPressButton}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableOpacity</Text>
                    </View>
                </TouchableOpacity>
                <TouchableNativeFeedback onPress={this._onPressButton} 
                    background={Platform.OS === 'android'?TouchableNativeFeedback.SelectableBackground():''}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableWithoutFeedback onPress={this._onPressButton}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableHighlight onPress={this._onPressButton} 
                    onLongPress={this._onLongPressButton}
                    underlayColor="white"
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Touchable with Long Press</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}