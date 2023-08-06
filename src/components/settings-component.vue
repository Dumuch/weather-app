<template>
    <div>

        <div class="city-list">
            <SlickList axis="y" v-model:list="store.cityList" @update:list="updateSort">
                <SlickItem v-for="(city, i) in store.cityList" :key="city.id" :index="i">
                    <div class="city-item__header">
                        {{ city.name }}, {{ city.weather.sys.country }}
                    </div>

                    <div class="city-item__body">
                        <div class="city-item__temperature">
                            <img class="temperature-image" width="100" height="100" />
                            <span class="temperature-number">{{ convertTemp(city.weather.main.temp) }}°C</span>
                        </div>
                    </div>
                    {{ city.weather && convertTemp(city.weather.main.temp) }}
                    <button @click="deleteCity(city.id)">delete</button>
                </SlickItem>
            </SlickList>
        </div>

        <h1>Настройки</h1>
        <span v-if="isNotFound && cityName.length !== 0">Not found</span>
        <input v-model="cityName" @input="findCity" />
        <button :disabled="isNotFound || isLoading" @click="addCity">Add</button>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { convertTempKelvinToCelsius } from '@/utils/helpers.ts';
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
    name: 'Settings',
    components: {
        SlickList,
        SlickItem,
    },
    data() {
        return {
            isNotFound: false,
            currentWeatherCity: null,
            cityName: '',
            isLoading: false,
        }
    },
    methods: {
        deleteCity(cityId) {
            this.weatherWidgetStore.deleteCity(cityId)
        },
        convertTemp(temp) {
            return convertTempKelvinToCelsius(temp)
        },
        updateSort(newOrder) {
            this.weatherWidgetStore.newOrder(newOrder)
        },
        async findCity() {
            this.isLoading = true;
            this.isNotFound = false;
            try {
                this.currentWeatherCity = await this.weatherWidgetStore.findCityByCityName(this.cityName)
                this.isNotFound = false;
            } catch (e) {
                this.isNotFound = true;
                this.currentWeatherCity = null
            } finally {
                this.isLoading = false;
            }
        },
        addCity() {
            this.currentWeatherCity && this.weatherWidgetStore.addCity({
                id: this.currentWeatherCity.id,
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
