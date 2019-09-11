import { TDT_URL } from './config';

const Version = 'v0.0.1';
const Cesium = window.Cesium;

class Gaia {
    constructor(dom, opt = {}) {
        this.Version = Version;
        this.Cesium = window.Cesium;
        this.opt = opt;
        this.init(dom);
        
    }
    init(dom) {
        const { TDT_IMG_C, TDT_CIA_C } = this.getTdtLayer();
        this.viewer = new Cesium.Viewer(dom, {
            selectionIndicator: false,
            animation: false, //是否显示动画控件
            baseLayerPicker: false, //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: false, //是否显示时间线控件
            sceneModePicker: true, //是否显示投影方式控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            fullscreenButton: true,
            imageryProvider: TDT_IMG_C,
        });
        this.viewer.imageryLayers.addImageryProvider(TDT_CIA_C);
        this.initWidget();
        setTimeout(() => {
            this.opt.onReady && this.opt.onReady();
        }, 0);
        
    }
    getTdtLayer() {
        //天地图影像服务（经纬度）
        const TDT_IMG_C = new Cesium.WebMapTileServiceImageryProvider({
            url: TDT_URL.TDT_IMG_C,
            layer: 'TDT_IMG_C',
            style: 'default',
            format: 'tiles',
            tileMatrixSetID: 'c',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tilingScheme: new Cesium.GeographicTilingScheme(),
            tileMatrixLabels: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
            ],
            maximumLevel: 17,
            show: false,
        });
        //天地图影像中文标记服务（经纬度）
        const TDT_CIA_C = new Cesium.WebMapTileServiceImageryProvider({
            url: TDT_URL.TDT_CIA_C,
            layer: 'TDT_CIA_C',
            style: 'default',
            format: 'tiles',
            tileMatrixSetID: 'c',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tilingScheme: new Cesium.GeographicTilingScheme(),
            tileMatrixLabels: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
            ],
            maximumLevel: 17,
            show: false,
        });
        return {
            TDT_IMG_C,
            TDT_CIA_C,
        };
    }
    initLngLatWidget() {
        const viewer = this.viewer;
        //得到当前三维场景
        const scene = viewer.scene;
        //得到当前三维场景的椭球体
        const ellipsoid = scene.globe.ellipsoid;

        let longitude = null;
        let latitude = null;
        let height = null;
        let cartesian = null;
        // 定义当前场景的画布元素的事件处理
        const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
        handler.setInputAction((movement) => {
            //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
            cartesian = viewer.camera.pickEllipsoid(
                movement.endPosition,
                ellipsoid
            );
            if (cartesian) {
                //将笛卡尔坐标转换为地理坐标
                var cartographic = ellipsoid.cartesianToCartographic(
                    cartesian
                );
                //将弧度转为度的十进制度表示
                longitude = Cesium.Math.toDegrees(cartographic.longitude);
                latitude = Cesium.Math.toDegrees(cartographic.latitude);
                //获取相机高度
                height = Math.ceil(
                    viewer.camera.positionCartographic.height
                );
            } else {
                //
            }
            
            this.opt.onMouseMove && this.opt.onMouseMove({
                lng:longitude.toFixed(6),
                lat:latitude.toFixed(6),
                height:height
            });
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
        handler.setInputAction(() => {
            height = Math.ceil(viewer.camera.positionCartographic.height);
            this.opt.onMouseWheel && this.opt.onMouseWheel({
                lng:longitude.toFixed(6),
                lat:latitude.toFixed(6),
                height:height
            });
        }, Cesium.ScreenSpaceEventType.WHEEL);
    }
    initWidget() {
        this.initLngLatWidget();
    }
}
Gaia.Cesium = window.Cesium;
export default Gaia;
