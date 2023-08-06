<template>
    <div class="weather-widget">
<!--        <settings/>-->
        <city-list/>
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
        await this.store.fetchWeather()
        try {
           const geocoder = new Geocoder();
           const test = await geocoder.getCurrentPosition();

        } catch (e) {

        }
    }
};
</script>

<style lang="scss">
.weather-widget {
    width: 300px;
    max-width: 100%;
}
</style>
