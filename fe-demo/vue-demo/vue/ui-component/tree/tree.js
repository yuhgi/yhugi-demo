var TreeItem = {
    name:'tree-item',
    template:'\
        <li class="mt-tree-item">\
            <div class="mt-tree-node"\
                @click="toggle"\
                @mouseover="mouseoverHandler"\
                @mouseout="mouseoutHandler"\
            >\
                <div :class="wholerowCls"></div>\
                <span :class="arrowCls"></span>\
                <checkbox class="mt-tree-checkbox" :checked="model.checked" />\
                <span class="mt-tree-text">{{model.name}}</span>\
            </div>\
            <ul v-show="open" v-if="isFolder">\
                <tree-item :model="model" v-for="model in model.children">\
                </tree-item>\
            </ul>\
        </li>\
    ',
    props:['model'],
    data:function(){
        return {
            open:this.model.open ?true:false,
            hover:false
        };
    },
    computed:{
        isFolder:function(){
            return this.model.children && this.model.children.length;
        },
        arrowCls:function(){
            return {
                'mt-tree-arrow':true,
                'mt-tree-arrow-expand':this.open,
                'mt-tree-arrow-hidden':!this.isFolder
            };
        },
        wholerowCls:function(){
            return {
                'mt-tree-wholerow':true,
                'mt-tree-wholerow-hover':this.hover
            };
        }
    },
    methods:{
        toggle:function(){
            this.open = !this.open;
        },
        mouseoverHandler:function(){
            this.hover = true;
        },
        mouseoutHandler:function(){
            this.hover = false;
        }
    },
    components:{
        'checkbox':Checkbox
    }
};


var Tree = {
    template:'\
        <ul class="mt-tree">\
          <tree-item\
            :model="treeData">\
          </tree-item>\
        </ul>\
    ',
    props:['treeData'],
    components:{
        'tree-item':TreeItem
    }
};