import React from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button:{
        marginBottom:5
    }
});

export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title:'Welcome'
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={{ paddingTop: 16 }}>
                <Button style={styles.button} onPress={() => {navigate('StyleDemo');}} title="Go to StyleDemo" />
                <Button style={styles.button} onPress={() => {navigate('SizeFixedDemo');}} title="Go to SizeFixedDemo" />
                <Button style={styles.button} onPress={() => {navigate('SizeFlexDemo');}} title="Go to SizeFlexDemo" />
                <Button style={styles.button} onPress={() => {navigate('InputDemo');}} title="Go to InputDemo" />
                <Button style={styles.button} onPress={() => {navigate('ButtonDemo');}} title="Go to ButtonDemo" />
                <Button style={styles.button} onPress={() => {navigate('TouchableDemo');}} title="Go to TouchableDemo" />
                <Button style={styles.button} onPress={() => {navigate('ScrollViewDemo');}} title="Go to ScrollViewDemo" />
                <Button style={styles.button} onPress={() => {navigate('PagingDemo');}} title="Go to PagingDemo" />
                <Button style={styles.button} onPress={() => {navigate('ZoomDemo');}} title="Go to ZoomDemo" />
                <Button style={styles.button} onPress={() => {navigate('FlatListDemo');}} title="Go to FlatListDemo" />
                <Button style={styles.button} onPress={() => {navigate('SectionListDemo');}} title="Go to SectionListDemo" />
            </ScrollView>
        );
    }
}