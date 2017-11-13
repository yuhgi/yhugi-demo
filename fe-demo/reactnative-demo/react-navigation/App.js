import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './src/components/Home';
import DrawNavigation from './src/components/DrawerNavigation/index.js';
import NestingNavigation from './src/components/NestingNavigation';
import EditInfo from './src/components/EditInfo';


const RootNavigatorConfig = {
    mode:'card',
    headerMode:'screen',
    navigationOptions:{

    }
};

export default StackNavigator({
    Home: {
        screen: Home,
        key:'Home'
    },
    DrawNavigation: {
        screen: DrawNavigation 
    },
    NestingNavigation:{
        screen:NestingNavigation,
        navigationOptions:{
            header:null
        }
    },
    EditInfo:{
        screen:EditInfo,
        navigationOptions:{
            title:'EditInfo'
        }
    }
}, RootNavigatorConfig);
