<template>
    <div>
        <h1>Настройки</h1>
        <span v-if="isNotFound && cityName.length !== 0">Not found</span>
        <input v-model="cityName" @input="findCity" />
        <button :disabled="isNotFound" @click="addCity">Add</button>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { storeToRefs } from 'pinia/dist/pinia';

export default {
    name: 'Settings',
    data() {
        return {
            isNotFound: false,
            currentWeatherCity: null,
            cityName: ''
        }
    },
    methods: {
        async findCity() {
            this.isNotFound = false;
            try {
                this.currentWeatherCity = await this.weatherWidgetStore.findCityByCityName(this.cityName)
                this.isNotFound = false;
            } catch (e) {
                this.isNotFound = true;
                this.currentWeatherCity = null
            }
        },
        addCity() {
            this.currentWeatherCity && this.weatherWidgetStore.addCity({
                lat: this.currentWeatherCity.coord.lat,
                lng: this.currentWeatherCity.coord.lon,
                name: this.currentWeatherCity.name
            })
            this.cityName = '';
        }
    },
    setup() {
        const weatherWidgetStore = useWeatherWidgetStore()
        return { weatherWidgetStore }
    },
};
</script>
