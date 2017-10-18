define(["vue"],function(Vue){
    return {
        template:'\
            <div class="schedule-leftpanel" :class="panelCls">\
                <div class="panel-title">\
                    <span class="panel-title-text">title</span>\
                    <span class="panel-title-arrow" @click="arrowClickHandler"></span>\
                </div>\
                <div class="panel-content">\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                    <p>测试内容</p>\
                </div>\
            </div>\
        ',
        data:function(){
            return{
                isExpanded:true
            };
        },
        computed:{
            panelCls:function(){
                return {
                    "panel":true,
                    "panel-collapse":!this.isExpanded
                };
            }
        },
        methods:{
            arrowClickHandler:function(){
                this.isExpanded = !this.isExpanded;
            }
        }
    };
});