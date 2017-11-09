import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import DrawNavigation from './components/DrawNavigation';


const RootNavigatorConfig = {
    headerMode: 'float'
};

export default StackNavigator({
    Home: {
        screen: Home
    },
    DrawNavigation: {
        screen: DrawNavigation 
    }
}, RootNavigatorConfig);
