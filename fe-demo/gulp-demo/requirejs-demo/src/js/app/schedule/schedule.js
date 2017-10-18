define(["vue","./bmap/bmap.js","./leftpanel/leftpanel.js","./bottompanel/bottompanel.js"],
    function(Vue,bmap,leftPanel,bottomPanel){
    return {
        template:'\
            <div class="schedule">\
                <bmap />\
                <left-panel />\
                <bottom-panel />\
            </div>\
        ',
        data:function(){
            return {

            };
        },
        components:{
            "bmap":bmap,
            "left-panel":leftPanel,
            "bottom-panel":bottomPanel
        }
    };
});