# Vue路由管理与状态管理

- [Vue路由管理与状态管理](#vue%E8%B7%AF%E7%94%B1%E7%AE%A1%E7%90%86%E4%B8%8E%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
    - [路由管理](#%E8%B7%AF%E7%94%B1%E7%AE%A1%E7%90%86)
        - [1. 基本使用](#1-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
        - [2. 声明式vs命令式导航](#2-%E5%A3%B0%E6%98%8E%E5%BC%8Fvs%E5%91%BD%E4%BB%A4%E5%BC%8F%E5%AF%BC%E8%88%AA)
        - [3. 导航守卫](#3-%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB)
        - [4. 数据获取](#4-%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96)
    - [状态管理](#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
        - [1. Vuex是什么](#1-vuex%E6%98%AF%E4%BB%80%E4%B9%88)
        - [2. state](#2-state)
        - [3. mutation](#3-mutation)
        - [4. action](#4-action)
        - [5. module](#5-module)
    - [课后作业](#%E8%AF%BE%E5%90%8E%E4%BD%9C%E4%B8%9A)

## 路由管理

### 1. 基本使用

`VueRouter`以插件形式提供路由功能
`router-link,router-view`会自动注册为全局组价
`router,route`会添加到`vm`上，可通过`this.$router,$this.$route`访问

```javascript
// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import studentManage from './studentManage/app.vue';
import teacherManage from './teacherManage/app.vue';

const router = new VueRouter({
    routes:[
        {
            path:'/teacherManage',
            component: teacherManage
        },{
            path:'/studentManage',
            component:studentManage
        }
    ]
});

export default router;

// mount.js
return new Vue({
    el,
    router,
    store,
    render: h => h(component)
});

```

>`<router-view>`组件件是函数式组件，用来渲染匹配到的视图组件，视图组件内部可继续使用`<router-view>`，实现嵌套路由的功能

### 2. 声明式vs命令式导航

声明式使用`<router-link>`组件，命令式使用`router`的方法

> `<router-link>`组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.

`<router-link>`支持的props

> - to
- replace
- append
- tag
- active-class
- exact
- event
- exact-active-class

可通过`router`实例方法进行导航

>- push
- replace
- go
- back
- forward

示例

```javascript
// 教师管理页面,通过两种导航方式到学生管理页面
<template>
    <div class="table">
        教师管理
        <button @click="onNavigateToStudent">前往学生管理-编程式</button>
        <router-link to="/studentManage">前往学生管理-声明式</router-link>
    </div>
</template>

<script>
    export default {
        methods:{
            onNavigateToStudent(){
                this.$router.push({ path: 'studentManage' });
            }
        }
    };
</script>
```

### 3. 导航守卫

在三个级别上都有导航的守卫

- 全局守卫
- 路由守卫
- 组件守卫

示例：通过路由导航守卫，设置不同页面的title

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import studentManage from './studentManage/app.vue';
import teacherManage from './teacherManage/app.vue';

const router = new VueRouter({
    routes:[
        {
            path:'/teacherManage',
            component: teacherManage,
            beforeEnter: (to, from, next) => {
                window.document.title = '教师管理';
                next();
            }
        },{
            path:'/studentManage',
            component:studentManage,
            beforeEnter: (to, from, next) => {
                window.document.title = '学生管理';
                next();
            }
        }
    ]
});

export default router;

```

### 4. 数据获取

通过路由对象`route`可以获取当前激活路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

```javascript
<template>
    <div class="table">
        教师管理
        <button @click="onNavigateToStudent">前往学生管理-编程式</button>
        <router-link to="/studentManage">前往学生管理-声明式</router-link>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$route);
        },
        methods:{
            onNavigateToStudent(){
                this.$router.push({ path: 'studentManage' });
            }
        }
    };
</script>

```

![route](http://thyrsi.com/t6/386/1539315868x1822611359.png)

## 状态管理

### 1. Vuex是什么

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vue的开发模式遵循单项数据流模式

![单项数据流](https://vuex.vuejs.org/flow.png)

问题：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

思考：

如何解决“多个视图依赖统一状态”？

- 将状态提取到父级组件中进行存储（data混乱，props混乱）
- 对状态进行同步（复杂度增加，混乱的通信）

如何解决“来自不同视图的行为需要变更同一状态”？

- 通过eventbus监听事件（事件的来源难追溯，状态变更不能复盘）

状态管理库的原始动机？

1. 应用实际上就是组件树，这个组件树上所有组件的view的数据全部从一个巨大的数据仓库store中映射而来。这样获取数据非常方便，数据到底处于什么状态也很容易查看。
2. 在组件树的任何位置上，都能够发起一个action，申请store中数据的变更，这个变更请求要遵守一定的接口规则，便于进行定位跟踪。

![vuex](https://vuex.vuejs.org/vuex.png)

### 2. state

vuex通过插件方式使用，会将store变量挂载到vm上，可通过`this.$store`访问

在任何组件中可以直接访问store中的数据

```javascript
this.$store.studentManage.XXX
```

可以通过mapState函数将state映射到组件的属性上

```javascript
computed:{
    ...mapState({
        tableList:state => state.studentManage.tableList // 这个state是全局状态
    })
}
```

### 3. mutation

- 只能通过mutation变更状态

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state,n) {
      // 变更状态
      state.count+=n
    }
  }
})

store.commit('increment',2)
```

- mutation只能是同步操作

- 使用常量规范所有的Mutation类型

### 4. action

- action通过提交mutation改变状态，而不能直接改变状态
- action可以包含任意的异步操作

```javascript
const store = new Vuex.Store({
  state: {
        count: 0
  },
  mutations: {
    increment (state) {
        state.count++
    }
  },
  actions: {
    increment (context) {
        context.commit('increment')
    },
    incrementAsync ({ commit,dispatch,state,rootState }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
    }
  }
})
```

### 5. module

module用来将state，mutations，actions，getters分模块管理

```javascript
const moduleA = {
  state: { ... },
  mutations: {
    increment (state,n) { // 这个state是模块的局部状态,相当于从顶层用state.moduleA访问
      // 变更状态
      state.count+=n
    }
  },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

- mutation,action,getter默认是全局命名空间的，可通过namespaced将其转换为带命名空间的模块

## 课后作业

切换分支到`feature/homework`，有完整的一个学生管理的页面。综合使用了`vue，vue-router，vuex`来完成整个页面的交互流程。

> 请参考学生管理页面的代码逻辑，完成教师管理页面的整个流程。
