
var ModalControl = function(){
    var modalEl = window.document.querySelector('.vue-modal');
    this.vm = new Vue({
        el:modalEl,
        template:'\
            <div :class="modalCls">\
                <custom-dialog @close="dialogClose" :options="dialogOptions" />\
            </div>\
        ',
        data:{
            active:false,
            dialogOptions:{}
        },
        computed:{
            modalCls:function(){
                return {
                    "mt-modal":true,
                    "mt-modal-active":this.active
                };
            }
        },
        components:{
            'custom-dialog':{template:'<div></div>'}
        },
        methods:{
            show:function(Dialog,options){
                this.$options.components['custom-dialog'] = Dialog;
                this.active = true;
                this.dialogOptions = options;
            },
            dialogClose:function(){
                this.close();
            },
            close:function(){
                this.active = false;
                this.$options.components['custom-dialog'] = '';
                this.dialogOptions = {};
            }
        }
    });
};


ModalControl.prototype.show = function(Dialog,options){
    this.vm.close();
    this.vm.show(Dialog,options);
};

ModalControl.prototype.close = function(){
    this.vm.close();
};

var modalControl = new ModalControl();