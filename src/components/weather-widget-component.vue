<template>
    <div>
        <city-list/>
        <settings/>
    </div>
</template>

<script>
import CityList from '@/components/city-list-component.vue';
import { Geocoder } from '@/service/geocoder/index.ts';
import Settings from '@/components/settings-component.vue';
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';

export default {
    name: "WeatherWidget",
    components: { Settings, CityList },
    setup() {
        const store = useWeatherWidgetStore()
        return { store }
    },
    async mounted() {
        this.store.getCityFromLocalStorage()
       const geocoder = new Geocoder();
       const test = await geocoder.getCurrentPosition();
    }
};
</script>
