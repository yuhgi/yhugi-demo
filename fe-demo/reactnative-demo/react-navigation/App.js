import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './src/components/Home';
import DrawNavigation from './src/components/DrawerNavigation/index.js';
import NestingNavigation from './src/components/NestingNavigation';


const RootNavigatorConfig = {
    headerMode:'none'
};

export default StackNavigator({
    Home: {
        screen: Home
    },
    DrawNavigation: {
        screen: DrawNavigation 
    },
    NestingNavigation:{
        screen:NestingNavigation
    }
}, RootNavigatorConfig);
