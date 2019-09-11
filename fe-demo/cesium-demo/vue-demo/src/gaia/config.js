//天地图URL配置
const TDT_TOKEN = '27fd07f4ce5050bacd301543a12fcccf';
const TDT_URL = {
    TDT_IMG_W:
        'https://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图影像服务地址(墨卡托投影)
    TDT_VEC_W:
        'https://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图矢量地图服务(墨卡托投影)
    TDT_CIA_W:
        'https://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default.jpg&tk=' +
        TDT_TOKEN, //在线天地图影像中文标记服务(墨卡托投影)
    TDT_CVA_W:
        'https://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default.jpg&tk=' +
        TDT_TOKEN, //在线天地图矢量中文标记服务(墨卡托投影)
    TDT_IMG_C:
        'https://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图影像服务地址(经纬度)
    TDT_VEC_C:
        'https://{s}.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图矢量地图服务(经纬度)
    TDT_CIA_C:
        'https://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图影像中文标记服务(经纬度)
    TDT_CVA_C:
        'https://{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TDT_TOKEN, //在线天地图矢量中文标记服务(经纬度)
};

export {
    TDT_URL,
};
