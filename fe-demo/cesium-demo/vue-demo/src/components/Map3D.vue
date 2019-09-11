<template>
    <Gaia ref="map" @on-ready="onReady" />
</template>

<script>
import GaiaComponent from '../gaia/app.vue';
import Gaia from '../gaia';
const Cesium = Gaia.Cesium;
const Builds = [
    {
        id: '0001',
        type: 'storage',
        lng: 121.924572,
        lat: 40.898204,
        name: '储罐1',
    },
    {
        id: '0002',
        type: 'storage',
        lng: 121.924843,
        lat: 40.897783,
        name: '储罐2',
    },
    {
        id: '0003',
        type: 'storage',
        lng: 121.925175,
        lat: 40.898474,
        name: '储罐3',
    },
    {
        id: '0004',
        type: 'storage',
        lng: 121.925375,
        lat: 40.897999,
        name: '储罐4',
    },
    {
        id: '0005',
        type: 'building',
        lng: 121.925294,
        lat: 40.896841,
        name: '建筑1',
    },
    {
        id: '0006',
        type: 'building',
        lng: 121.925769,
        lat: 40.897454,
        name: '建筑2',
    },
    {
        id: '0007',
        type: 'building',
        lng: 121.924609,
        lat: 40.896812,
        name: '建筑3',
    },
];
export default {
    components: {
        Gaia: GaiaComponent,
    },
    methods: {
        onReady({ viewer, app }) {
            this.app = app;
            this.viewer = viewer;
            this.addTileSet();
            this.addMarkers();
        },
        addTileSet() {
            const viewer = this.viewer;
            var tileset = new Cesium.Cesium3DTileset({
                url: 'http://data.marsgis.cn/3dtiles/max-ytlhz/tileset.json',
            });

            tileset.readyPromise
                .then(function(tileset) {
                    viewer.scene.primitives.add(tileset);
                    viewer.zoomTo(
                        tileset,
                        new Cesium.HeadingPitchRange(
                            0.5,
                            -0.2,
                            tileset.boundingSphere.radius * 1.0
                        )
                    );
                })
                .otherwise(function(error) {
                    console.log(error);
                });
        },
        addMarkers() {
            for (const item of Builds) {
                if (item.type === 'building') {
                    this.addBuilding(item);
                }
                if (item.type === 'storage') {
                    this.addStorage(item);
                }
            }
        },
        addBuilding(obj) {
            this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(obj.lng, obj.lat,12),
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.GREEN,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
                label: {
                    text: obj.name,
                    font: '14pt monospace',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -5),
                },
            });
        },
        addStorage(obj) {
            this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(obj.lng, obj.lat,25),
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
                label: {
                    text: obj.name,
                    font: '14pt monospace',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -5),
                },
            });
        },
    },
};
</script>
