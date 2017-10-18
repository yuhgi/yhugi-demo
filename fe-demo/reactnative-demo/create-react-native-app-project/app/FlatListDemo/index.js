import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
const data = [
    { key: 'Devin' },
    { key: 'Jackson' },
    { key: 'James' },
    { key: 'Joel' },
    { key: 'John' },
    { key: 'Jillian' },
    { key: 'Jimmy' },
    { key: 'Julie' },
];

export default class FlatListDemo extends React.Component {
    static navigationOptions = {
        title: 'FlatList Demo'
    };
    _renderItem = ({item,index}) => {
        console.log(item);
        return <Text style={styles.item} key={index}>{item.key}</Text>;
    }
    render(){
        return (
            <View style={styles.container}>
                <FlatList data={data} 
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}