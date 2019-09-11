<template>
    <div ref="container" class="cesium-container">
        
    </div>
</template>

<script>
import gaia from '../gaia';
export default {
    mounted() {
        const app = new gaia(this.$refs.container);
    },
}
</script>
