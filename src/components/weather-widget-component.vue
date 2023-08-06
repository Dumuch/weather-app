<template>
    <div>
        <current-city/>
    </div>
</template>

<script>
import CurrentCity from '@/components/current-city-component.vue';
import { Geocoder } from '@/service/geocoder/index.ts';

export default {
    name: "WeatherWidget",
    components: { CurrentCity },
    async mounted() {
       const geocoder = new Geocoder();
       const test = await geocoder.getCurrentPosition();
        console.log(test.coords.latitude)
    }
};
</script>
