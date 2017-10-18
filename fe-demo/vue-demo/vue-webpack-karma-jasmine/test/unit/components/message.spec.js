import Vue from 'vue';
import Message from '../../../src/app/components/message.vue';

function getRenderedVM(Component,propsData){
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({propsData:propsData}).$mount();
    return vm;
}

describe('test message.vue',() => {
    it('message should be ""',() => {
        let vm = getRenderedVM(Message,{message:'hit me'});
        expect(vm.message).toBe('hit me');
        expect(vm.msg).toBe(vm.message);
    });
});