import { StackNavigator } from 'react-navigation';

import Home from './app/Home';
import StyleDemo from './app/StyleDemo';
import { SizeFixedDemo, SizeFlexDemo } from './app/SizeDemo';
import InputDemo from './app/InputDemo';
import {ButtonDemo,TouchableDemo} from './app/TouchDemo';
import {ScrollViewDemo,PagingDemo} from './app/ScrollViewDemo';
import FlatListDemo from './app/FlatListDemo';
import SectionListDemo from './app/SectionListDemo';

const App = StackNavigator({
    Home: { screen: Home },
    StyleDemo: { screen: StyleDemo },
    SizeFixedDemo: { screen: SizeFixedDemo },
    SizeFlexDemo: { screen: SizeFlexDemo },
    InputDemo:{screen:InputDemo},
    ButtonDemo:{screen:ButtonDemo},
    TouchableDemo:{screen:TouchableDemo},
    ScrollViewDemo:{screen:ScrollViewDemo},
    PagingDemo:{screen:PagingDemo},
    FlatListDemo:{screen:FlatListDemo},
    SectionListDemo:{screen:SectionListDemo}
});

export default App;