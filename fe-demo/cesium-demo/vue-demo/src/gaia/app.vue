<template>
    <div ref="container" class="gaia-container">
        <div class="gaia-toolbar">
            <span class="gaia-toolbar-item gaia-toolbar-lng">经度:{{lng}}</span>
            <span class="gaia-toolbar-item gaia-toolbar-lat">纬度:{{lat}}</span>
            <span class="gaia-toolbar-item gaia-toolbar-height">视高:{{height}}</span>
        </div>
    </div>
</template>

<script>
import Gaia from './index';
export default {
    data(){
        return {
            lat:0, // 鼠标经度
            lng:0, // 鼠标纬度
            height:0, // 当前视角高度
            app:null,
            Gaia:null,
            viewer:null,
        }
    },
    mounted() {
        const vm = this;
        this.app = new Gaia(this.$refs.container,{
            onMouseMove(obj){
                vm.lat = obj.lat;
                vm.lng = obj.lng;
                vm.height = obj.height;
            },  
            onMouseWheel(obj){
                vm.lat = obj.lat;
                vm.lng = obj.lng;
                vm.height = obj.height;
            },
            onReady(){
                vm.$emit('on-ready',{
                    app:vm.app,
                    viewer:vm.app.viewer
                });
            }
        });
        this.Gaia = Gaia;
    },
};
</script>

<style lang="scss" scoped>
.gaia-container{
    position: relative;
    width:100%;
    height: 100%;
}
.gaia-toolbar{
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
    height: 32px;
    color:#FFF;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index:9999;
    &-item{
        margin:0 20px;
    }
}
</style>
