import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
    container:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'rgba(200,200,200,0.3)',
        borderStyle:'solid'
    },
    title:{
        width:'100%',
        height:20,
        backgroundColor:'rgba(0,0,0,0.4)',
        position:'absolute',
        bottom:0,
        fontSize:14,
        color:'#FFF',
        textAlign:'center'
    },
    item:{
        justifyContent:'center',
        alignItems:'center'
    },
    indicatorContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        height:20,
        right:10,
        bottom:5
    },
    indicator:{
        width:10,
        height:10,
        marginLeft:4,
        fontSize:18,
        borderRadius:5,
        backgroundColor:'white'
    },
    indicatorActive:{
        backgroundColor:'orange'
    }
});


const data = [{
    img:require('./img/pic-1.jpg'),
    title:'风景图片1'
},{
    img:require('./img/pic-2.jpg'),
    title:'风景图片2'
},{
    img:require('./img/pic-3.jpg'),
    title:'风景图片3'
},{
    img:require('./img/pic-4.jpg'),
    title:'风景图片4'
}];

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex:0
        };
    }
    static defaultProps = {
        duration:2000,
        width:300,
        height:180
    };
    componentDidMount(){
        this._startTimer();
    }
    componentWillUnmount(){
        this._clearTimer();
    }
    _clearTimer(){
        clearInterval(this.autoTimer);
        this.autoTimer = null;
    }
    _startTimer(){
        let cnt = data.length;
        this.autoTimer = setInterval(() => {
            let currentIndex = (this.state.currentIndex + 1) % cnt;
            this.setState({
                currentIndex:currentIndex
            });
            this.refs.scrollView.scrollTo({
                y:0,
                x:this.props.width * currentIndex,
                animated:true
            });
        },this.props.duration);
    }
    _onScrollBeginDrag = () => {
        this._clearTimer();
    }
    _onScrollEndDrag = () => {
        this._startTimer();
    }
    _onMomentumScrollEnd = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x;
        let currentIndex = Math.floor((offsetX + this.props.width/2) / this.props.width);
        this.setState({
            currentIndex:currentIndex
        });
    }
    _renderItems(){
        return data.map((item,index) => {
            return (
                <View style={[styles.item,{width:this.props.width}]} key={index}>
                    <Image source={item.img} style={{width:'100%',height:this.props.height,resizeMode:Image.resizeMode.stretch}} />
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            );
        });
    }
    _renderIndicator(){
        return data.map((item,index) => {
            let style = index === this.state.currentIndex ? 
                [styles.indicator,styles.indicatorActive] : 
                [styles.indicator];  
            return <Text key={index} style={style}>•</Text>;
        });
    }
    render(){
        return (
            <View style={{width:this.props.width,height:this.props.height}}>
                <ScrollView 
                    ref="scrollView"
                    contentContainerStyle={[styles.container]}
                    pagingEnabled 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                >
                    {this._renderItems()}
                </ScrollView>
                <View style={styles.indicatorContainer}>{this._renderIndicator()}</View>
            </View>
        );
    }
}

export default class PagingDemo extends React.Component{
    static navigationOptions = {
        title:'Paging Demo'
    };
    render(){
        return (
            <Slider />
        );
    }
}