import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City, AddCity } from '@/models/WeatherWidgetModel.ts';

import { Api } from '@/service/api/index.ts';
import type { WeatherData } from '@/models/WeatherWidgetModel.ts';
import type { WeatherWidgetStore } from '@/models/WeatherWidgetModel.ts';
import { LocalStorage }  from '@/service/localStorage/index.ts';
const CITY_LIST_KEY = 'cityList'
const api = new Api('https://api.openweathermap.org/data/2.5/weather?appid=2b9d95b2380238ead959af9d5ef04d31');

export const useWeatherWidgetStore = defineStore('weatherWidget', () => {
    const cityList = ref<City[]>([]);
    const currentCity = ref<City | null>({ id: 0, lat: 0, lng: 0, name: 's;dfasdas' });

    function setCurrentCity(cityId) {
        currentCity.value = cityList.value.find(city => city.id === cityId)
    }

    function addCity(city:AddCity) {
        cityList.value.push({ id: new Date().getTime(), lat: city.lat, lng: city.lng, name: city.name });
        updateStorage()
    }

    function deleteCity(id: number) {
        cityList.value = cityList.value.filter(city => city.id !== id)
        updateStorage()
    }

    function getCityFromLocalStorage() {
        const cities = LocalStorage.getStorage<City[]>(CITY_LIST_KEY)
        if (cities) {
            cityList.value = cities
        }
    }

    async function findCityByCityName(cityName: string): Promise<WeatherData> {
        try {
            return await api.get('', { q: cityName });
        } catch (err) {
            throw Error()
        }
    }

    function updateStorage() {
        LocalStorage.setStorage(CITY_LIST_KEY, cityList.value);
    }

    return { cityList, addCity, deleteCity, getCityFromLocalStorage, currentCity, setCurrentCity, findCityByCityName }
})
