<template>
    <div>
        <ul>
            <li v-for="city in store.cityList " :key="city.id">
                {{ city.name }}
                {{city.weather && convertTemp(city.weather.main.temp)}}
                <button @click="deleteCity(city.id)">delete</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { convertTempKelvinToCelsius } from '@/utils/helpers.ts';

export default {
    name: 'CityList',
    setup() {
        const store = useWeatherWidgetStore()
        return { store }
    },
    methods: {
        deleteCity(cityId) {
            this.store.deleteCity(cityId)
        },
        convertTemp(temp) {
            return convertTempKelvinToCelsius(temp)
        }
    }
};
</script>
