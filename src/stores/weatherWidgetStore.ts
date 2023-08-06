import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City, AddCity } from '@/models/WeatherWidgetModel.ts';

import { Api } from '@/service/api/index.ts';
import type { WeatherData } from '@/models/WeatherWidgetModel.ts';
import { LocalStorage } from '@/service/localStorage/index.ts';

const CITY_LIST_KEY = 'cityList'
const api = new Api('https://api.openweathermap.org/data/2.5/weather?appid=2b9d95b2380238ead959af9d5ef04d31');

export const useWeatherWidgetStore = defineStore('weatherWidget', () => {
    const cityList = ref<City[]>([]);

    async function addCity(city: AddCity) {
        if (!cityList.value.find(city => city.id === city.id)) {
            cityList.value.push({ id: city.id, lat: city.lat, lng: city.lng, name: city.name, weather: null });
            await fetchWeather()
            updateStorage()
        }
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

    async function fetchWeather() {
        const promises = []

        cityList.value.forEach(city => {
            promises.push(
                api.get('', { id: city.id })
            )
        })

        const citiesWeather = await Promise.all<WeatherData>(promises)

        cityList.value = cityList.value.map(city => {
            const weather = citiesWeather.find(cityWeather => cityWeather.id === city.id)
            if (weather) {
                city.weather = weather
            }
            return city
        })
        updateStorage()
    }

    function newOrder(array: City[]) {
        cityList.value = array
        updateStorage()
    }

    async function addCityByLatLng(lat: number, lng: number) {
        const data = await api.get('', { lat: lat,  lon: lng }) as WeatherData;
        if (data) {
            await addCity({ id: data.id, lat: lat, lng: lng, name: data.name })
        }
    }

    return { cityList, addCity, deleteCity, getCityFromLocalStorage, findCityByCityName, fetchWeather, newOrder, addCityByLatLng }
})
