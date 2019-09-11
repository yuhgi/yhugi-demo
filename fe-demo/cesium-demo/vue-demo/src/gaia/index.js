import { TDT_URL } from './config';
const Version = 'v0.0.1';
const Cesium = window.Cesium;

class Gaia {
    constructor(dom) {
        this.Version = Version;
        this.Cesium = window.Cesium;
        this.init(dom);
        
    }
    init(dom) {
        const {TDT_IMG_C,TDT_CIA_C} = this.getTdtLayer();
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
            imageryProvider:TDT_IMG_C
        });
        this.viewer.imageryLayers.addImageryProvider(TDT_CIA_C);
    }
    getTdtLayer(){
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
            maximumLevel: 18,
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
            maximumLevel: 18,
            show: false,
        });
        return {
            TDT_IMG_C,
            TDT_CIA_C
        };
    }
    initMap() {
        
        
    }
    initWidget() {}
}

export default Gaia;
