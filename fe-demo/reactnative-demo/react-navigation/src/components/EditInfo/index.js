import React from 'react';
import {NavigationActions} from 'react-navigation';
import {View,Button,ActivityIndicator,TextInput} from 'react-native';

const navigateHomeAction = NavigationActions.navigate({
    routeName:'Home',
    params:{}
});

const backHomeAction = NavigationActions.back({
    key:'Home'
});

class EditInfo extends React.Component{
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let headerRight = (
            <Button
                title="Save"
                onPress={params.handleSave ? params.handleSave : () => null}
            />
        );

        if(params.isSaving){
            headerRight = <ActivityIndicator />
        }
        return {
            headerRight
        }
    };

    state = {
        nickname:'Lucy jacuzzi'
    }
    _handleSave = () => {
        this.props.navigation.setParams({isSaving:true});
        // pretend save information action...
        setTimeout(() => {
            this.props.navigation.setParams({isSaving:false});
        },1000)
    }
    componentDidMount(){
        this.props.navigation.setParams({handleSave:this._handleSave});
    }
    _onBackPress(){
        this.props.navigation.dispatch(backHomeAction);
    }
    render(){
        return (
            <View>
                <TextInput
                    onChangeText={(nickname) => this.setState({nickname})}
                    placeholder={'Nickname'}
                    value={this.state.nickname}
                />
                <Button title="Back to Home" onPress={this._onBackPress.bind(this)} />
            </View>
            
        );
    }
}

export default EditInfo;