<template>
    <Gaia ref="map" @on-ready="onReady" />
</template>

<script>
import GaiaComponent from '../gaia/app.vue';
import Gaia from '../gaia';
const Cesium = Gaia.Cesium;
export default {
    components: {
        Gaia: GaiaComponent,
    },
    methods: {
        onReady({viewer,app}) {
            this.app = app;
            this.viewer = viewer;
            this.addTileSet();
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
    },
};
</script>
