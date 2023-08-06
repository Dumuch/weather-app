<template>
    <div>
        <ul>
            <li v-for="city in store.cityList " :key="city.id">
                {{ city.name }}
                <button @click="deleteCity(city.id)">delete</button>
            </li>
        </ul>
        <h1>{{ currentCity.name }}</h1>
        <h2>test</h2>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { storeToRefs } from 'pinia/dist/pinia';

export default {
    name: 'CityList',
    setup() {
        const store = useWeatherWidgetStore()
        const { currentCity } = storeToRefs(store)
        return { currentCity, store }
    },
    methods: {
        deleteCity(cityId) {
            this.store.deleteCity(cityId)
        }
    }
};
</script>
