import Vue from 'vue';
import App from '../../src/app/app.vue';

function getRenderedVM(Component,propsData){
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({propsData:propsData}).$mount();
    return vm;
}

describe('test app.vue',() => {
    it('has a created hook',() => {
        expect(typeof App.created).not.toBe('function');
    });
    it('sets the correct default data',() => {
        expect(typeof App.data).toBe('function');
        const defaultData = App.data();
        expect(defaultData.title).toBe('this is title');
        expect(defaultData.message).toBe('this is message');
    });
    it('correctly sets the message when created',() => {
        const vm = new Vue(App).$mount();
        expect(vm.title).toEqual('标题');
        expect(vm.message).toEqual('这是子组件');
    });

    it('renders the correct message',() => {
        const Ctor = Vue.extend(App);
        const vm = new Ctor().$mount();
        expect(vm.$el.textContent).toBe('this is title this is message');
    });

    describe('test methods',() => {
        it('message should be "你好世界"',() => {
            const vm = new Vue(App).$mount();
            vm.setMessage('你好世界');
            expect(vm.message).toBe('你好世界');
        });
    });
    it('updates the rendered message when vm.message updates',done => {
        const vm = new Vue(App).$mount();
        vm.setMessage('foo');
        Vue.nextTick(() => {
            expect(vm.$el.children[1].textContent).toBe('foo');
            done();
        });
    });
});