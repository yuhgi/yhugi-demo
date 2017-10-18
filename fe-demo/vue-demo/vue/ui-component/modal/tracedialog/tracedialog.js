var TraceDialog = {
    template:'\
        <div class="trace-dialog">\
            <div class="trace-dialog-header">\
                <div class="header-title">\
                    {{"警员A"}}历史轨迹\
                </div>\
                <i class="header-close" @click="closeClick"></i>\
            </div>\
            <div class="trace-dialog-body"></div>\
            <div class="trace-dialog-footer"></div>\
        </div>\
    ',
    methods:{
        closeClick:function(){
            this.$emit('close');
        }
    }
};