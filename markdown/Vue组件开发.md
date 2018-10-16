# Vue组件开发

- [Vue组件开发](#vue%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91)
    - [1. Vue是什么](#1-vue%E6%98%AF%E4%BB%80%E4%B9%88)
    - [2. 组件](#2-%E7%BB%84%E4%BB%B6)
        - [2.1 组件声明周期](#21-%E7%BB%84%E4%BB%B6%E5%A3%B0%E6%98%8E%E5%91%A8%E6%9C%9F)
        - [2.2 组件的渲染](#22-%E7%BB%84%E4%BB%B6%E7%9A%84%E6%B8%B2%E6%9F%93)
        - [2.3 组件的注册](#23-%E7%BB%84%E4%BB%B6%E7%9A%84%E6%B3%A8%E5%86%8C)
        - [2.4 prop,data,computed,watch](#24-propdatacomputedwatch)
        - [2.5 组件的通信](#25-%E7%BB%84%E4%BB%B6%E7%9A%84%E9%80%9A%E4%BF%A1)
        - [2.6 插槽](#26-%E6%8F%92%E6%A7%BD)
    - [3. 组件设计实践](#3-%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%AE%9E%E8%B7%B5)
    - [4. 扩展知识](#4-%E6%89%A9%E5%B1%95%E7%9F%A5%E8%AF%86)
        - [4.1 mixins Vs 高阶组件](#41-mixins-vs-%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
        - [4.2 Container组件与Presentation组件](#42-container%E7%BB%84%E4%BB%B6%E4%B8%8Epresentation%E7%BB%84%E4%BB%B6)

## 1. Vue是什么

用途：用于构建用户界面的渐进式框架

语法：支持template与jsx

编程方式： 声明式编程

```html
// 声明式
<my-modal :show="true" />
```

```javascript
// 命令式
$('.my-modal').show();
```

使用virtual dom

响应式系统

支持组件化

支持指令系统

支持scoped css

完善的生态系统

## 2. 组件

### 2.1 组件声明周期

生命周期钩子函数

- beforeCreate
- created （响应式系统开始工作）
- beforeMount
- mounted （DOM结构可用）
- beforeUpdate
- updated
- activated
- deactivated
- beforeDestroy （销毁事件监听，定时器，取消ajax请求）
- destroyed
- errorCaptured

![组件生命周期](https://cn.vuejs.org/images/lifecycle.png)

### 2.2 组件的渲染

```html
<my-layout>
    <my-layout-header></my-layout-header>
    <my-layout-content></my-layout-content>
<my-layout>
```

state（data，computed）与prop的变化会导致render方法调用
父组件的挂载要等待子组件的挂载完成
父组件的render方法会导致子组件render方法的调用
render方法调用会根据virtual dom进行渲染

### 2.3 组件的注册

全局组件

```javascript
Vue.component('my-panel',{
    props:{
        title:{
            type:String,
            default:() => ''
        }
    }
    template:`
        <div class="my-panel">
            <div class="my-panel-header">{{title}}</div>
            <slot></slot>
        </div>
    `
});
```

局部注册

```javascript
var MyPanel = {
    name:'my-panel',
    props:{
        title:{
            type:String,
            default:() => ''
        }
    }
    template:`
        <div class="my-panel">
            <div class="my-panel-header">{{title}}</div>
            <slot></slot>
        </div>
    `
});

// 使用
var vm = new Vue({
    template:`
        <my-panel />
    `,
    components:{
        'my-panel':MyPanel
    }
});
```

使用插件进行模块注册

```javascript
// 插件实现，以ElementUI为例
import Button from './components/Button';

ElementUI.install = function(Vue,options){
    Vue.component('Button',Button);
    // ...

};

// 使用插件
Vue.use('element-ui');
```

### 2.4 prop,data,computed,watch

- prop: 父组件向子组件传递数据使用
- data: 组件内部的状态
- computed: 需要复杂的逻辑计算的属性
- watch: 侦听属性变化

```javascript
var MyPanel = {
    name:'my-panel',
    props:{
        title:{
            type:String,
            default:() => ''
        }
    }
    template:`
        <div class="my-panel">
            <div class="my-panel-header">{{title}}</div>
            <slot></slot>
        </div>
    `
});

// 需求：支持全屏显示
var vm = new Vue({
    props:{
        fullpage:{ // 是否全屏显示(最高优先级)
            type:Boolean,
            default:() => false
        }
    },
    template:`
        <div :class="wrapperCls">
            <my-panel title="人事管理" v-if="hrPanelShow" />
        </div>
    `,
    components:{
        'my-panel':MyPanel
    },
    data(){
        return {
            innerFullpage:this.$props.fullpage, // 是否全屏显示
            hrPanelShow:false // 人事管理是否显示
        }
    },
    computed:{
        wrapperCls(){
            return {
                'wrapper':true,
                'wrapper-fullpage':this.innerFullpage
            }
        }
    },
    watch:{
        fullpage(newVal,oldVal){
            this.innerFullpage = newVal;
        }
    }
});
```

### 2.5 组件的通信

- 父向子组件通信

```javascript
// parent.vue
<template>
    <div class="parent">
        <button @click="onClick">更改名称</button>
        <custom-child :name="firstChildName" />
    </div>
</template>

<script>
    import ChildComponent from './child';
    export default {
        components:{
            'custom-child':ChildComponent
        },
        data(){
            return {
                firstChildName:'jim'
            };
        },
        methods:{
            onClick(){
                this.firstChildName = 'bob';
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
```

- 子向父组件通信

```javascript
// child.vue
<template>
    <div class="child">
        <div class="child-name">{{ name }}</div>
        <button @click="onAgeClick">增加一岁</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                age:0
            };
        },
        methods:{
            onAgeClick(){
                this.age = this.age+1;
                this.$emit('ageIncrement',name,this.age);
            }
        }
    };
</script>



// parent.vue

<template>
    <div class="parent">
        <button @click="onClick">更改名称</button>
        <custom-child :name="firstChildName" @ageIncrement="onAgeIncrement" />
    </div>
</template>

<script>
    import ChildComponent from './child';
    export default {
        components:{
            'custom-child':ChildComponent
        },
        data(){
            return {
                firstChildName:'jim'
            };
        },
        methods:{
            onClick(){
                this.firstChildName = 'bob';
            },
            onAgeIncrement(name,age){
                //
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>

```

- 通过eventbus通信

```javascript
// eventBus.js
import Vue from 'vue';
const eventBus = new Vue();

export default eventBus;

// child.vue
<template>
    <div class="child">
        <div class="child-name">{{ name }}</div>
        <button @click="onAgeClick">增加一岁</button>
    </div>
</template>

<script>
    import eventBus from './eventBus';
    export default {
        data(){
            return {
                age:0
            };
        },
        methods:{
            onAgeClick(){
                this.age = this.age+1;
                this.$emit('ageIncrement',name,this.age);
                eventBus.$emit('ageIncrement',name,this.age);
            }
        }
    };
</script>



// sibling.vue
<template>
    <div class="sibling">
        {{ info }}
    </div>
</template>

<script>
    import eventBus from './eventBus';
    export default {
        data(){
            return {
                info:''
            };
        },
        created() {
            eventBus.$on('ageIncrement',this.handleAgeIncrement);
        },
        methods:{
            handleAgeIncrement(name,age){
                this.info = `${name}岁数增长为${age}`;
            }
        }
    };
</script>

```

> eventbus的原理 ： 发布-订阅模式（观察者模式的变种）

- 使用状态管理库

组件的一些内部状态在内部管理
跟应用相关的所有状态都放入store进行管理
从store中将数据映射到组件的状态中

### 2.6 插槽

```javascript
// base-layout
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// slot的使用
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

## 3. 组件设计实践

1. 组件props原子化
2. 组件props必须校验
3. 组件的拆分

    - 优劣对比
    > 如果组件太大，不利于重用和维护
    > 如果组件拆分的太小，那么代码结构将不可控，组件层级变得过于复杂

    - 何时拆分？
    > 被多次使用，从代码重用的角度需要拆分为组件
    > 逻辑过于复杂，从关注度分离的角度需要拆分（代码500行左右？）

4. 组件的html模板,css,js要有内聚性，尽量少的受到全局性的影响

扩展阅读 ： [Vue组件开发规范](https://pablohpsilva.github.io/vuejs-component-style-guide/#/chinese?id=%E5%85%B6%E5%AE%83%E8%AF%AD%E8%A8%80)

## 4. 扩展知识

### 4.1 mixins Vs 高阶组件

混入(mixin)用来封装通用逻辑

```javascript
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

高阶函数(higher-order function)指操作函数的函数，一般地，有以下两种情况

　　1、函数可以作为参数被传递

　　2、函数可以作为返回值输出
　　
高阶组件(high-order-component), 接收组件作为参数，以组件作为返回值
　　
　　作用：
　　类似装饰器模式的逻辑重用，每通过一层高阶函数，都被装饰上一些额外的功能
　　
扩展阅读 [探索Vue高阶组件](http://hcysun.me/2018/01/05/%E6%8E%A2%E7%B4%A2Vue%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6/)

### 4.2 Container组件与Presentation组件

容器组件获取数据，并处理状态
展示组件被动接受props，并负责处理展示

扩展阅读

[Container Components](https://medium.com/@learnreact/container-components-c0e67432e005)
[容器组件](https://www.w3ctech.com/topic/1895)
