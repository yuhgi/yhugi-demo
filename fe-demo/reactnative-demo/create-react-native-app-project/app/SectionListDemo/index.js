import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const data = [
    { title: 'D', data: ['Devin'] },
    { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
];

export default class SectionListDemo extends React.Component {
    static navigationOptions = {
        title: 'SectionList Demo'
    }
    _renderItem = ({item,index}) => {
        return <Text style={styles.item} key={index}>{item}</Text>;
    }
    _renderSectionHeader = ({section}) => {
        return <Text style={styles.sectionHeader} key={section.title}>{section.title}</Text>;
    }
    render() {
        return (
            <View style={styles.container}>
                <SectionList sections={data} 
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                />
            </View>
        );
    }
}