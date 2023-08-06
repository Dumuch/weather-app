import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { City } from "@/models/WeatherWidgetModel.ts";

import { Api } from '@/service/api/index.ts';

const api = new Api('https://api.openweathermap.org/data/2.5/weather?appid=2b9d95b2380238ead959af9d5ef04d31');

export const useWeatherWidgetStore = defineStore('weatherWidget', () => {
    const cityList = ref<City[]>([]);
    const currentCity = ref<City | null>({ id: 0, lat: 0, lng: 0, name: 's;dfasdas' });

    function setCurrentCity(cityId) {
        currentCity.value = cityList.value.find(city => city.id === cityId)
    }

    function addCity(latitude, longitude) {


        cityList.value.push({ id: new Date().getTime(), lat: latitude, lng: longitude, name: 'city' });
    }

    function deleteCity(id: number) {
        cityList.value = cityList.value.filter(city => city.id !== id)
    }

    function setCity(list: City[]) {
        cityList.value = list
    }

    return { cityList, addCity, deleteCity, setCity, currentCity, setCurrentCity }
})
