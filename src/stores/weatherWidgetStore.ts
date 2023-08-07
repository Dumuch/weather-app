import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City, AddCity } from '@/models/WeatherWidgetModel';

import { Api } from '@/service/api';
import type { WeatherData } from '@/models/WeatherWidgetModel';
import { LocalStorage } from '@/service/localStorage';

const CITY_LIST_KEY = 'cityList'
const api = new Api('https://api.openweathermap.org/data/2.5/weather?appid=' + import.meta.env.VITE_OPENWEATHERMAP_ORG_KEY);

export const useWeatherWidgetStore = defineStore('weatherWidget', () => {
    const cityList = ref<City[]>([]);

    async function addCity(newCity: AddCity) {
        if (!cityList.value.find(city => city.id === newCity.id)) {
            cityList.value.push({ id: newCity.id, lat: newCity.lat, lng: newCity.lng, name: newCity.name, weatherData: null });
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
        const promises:WeatherData[] = []

        for (const city of cityList.value) {
            promises.push(
                await api.get('', { id: city.id })
            )
        }

        const citiesWeather = await Promise.all<WeatherData>(promises)

        cityList.value = cityList.value.map(city => {
            const weather = citiesWeather.find(cityWeather => cityWeather.id === city.id)
            if (weather) {
                city.weatherData = weather
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
