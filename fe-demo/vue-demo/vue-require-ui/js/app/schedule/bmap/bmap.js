define(["vue"],function(Vue){
    return {
        template:'\
            <div class="schedule-map" id="b-map"></div>\
        ',
        data:function(){
            return {};
        },
        mounted:function(){
            var BMap = window.BMap;
            var map = new BMap.Map("b-map");
        }
    };
});