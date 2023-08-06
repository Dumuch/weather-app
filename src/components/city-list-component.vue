<template>
    <div>
        <SlickList axis="y" v-model:list="store.cityList" @update:list="updateSort">
            <SlickItem v-for="(city, i) in store.cityList" :key="city.id" :index="i">
                {{ city.name }}
                {{city.weather && convertTemp(city.weather.main.temp)}}
                <button @click="deleteCity(city.id)">delete</button>
            </SlickItem>
        </SlickList>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { convertTempKelvinToCelsius } from '@/utils/helpers.ts';
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
    name: 'CityList',
    components: {
        SlickList,
        SlickItem,
    },
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
        },
        updateSort(newOrder) {
            this.store.newOrder(newOrder)
        }
    }
};
</script>
