import { defineStore } from 'pinia'
import type { City, AddCity } from '@/models/WeatherWidgetModel';

import { Api } from '@/service/api';
import type { WeatherData } from '@/models/WeatherWidgetModel';
import { LocalStorage } from '@/service/localStorage';
import type { WeatherWidgetStoreState } from '@/stores/weatherWidgetStore.types';

const CITY_LIST_KEY = 'cityList'
const api = new Api('https://api.openweathermap.org/data/2.5/weather?appid=' + import.meta.env.VITE_OPENWEATHERMAP_ORG_KEY);

export const useWeatherWidgetStore = defineStore('weatherWidget', {
        state: (): WeatherWidgetStoreState => ({
            cityList: []
        }),
        actions: {
            async addCity(newCity: AddCity): Promise<void> {
                if (!this.cityList.find(city => city.id === newCity.id)) {
                    this.cityList.push({
                        id: newCity.id,
                        lat: newCity.lat,
                        lng: newCity.lng,
                        name: newCity.name,
                        weatherData: null
                    });
                    await this.fetchWeather()
                    this.updateStorage()
                }
            },
            deleteCity(id: number): void {
                this.cityList = this.cityList.filter(city => city.id !== id)
                this.updateStorage()
            },

            getCityFromLocalStorage(): void {
                const cities = LocalStorage.getStorage<City[]>(CITY_LIST_KEY)
                if (cities) {
                    this.cityList = cities
                }
            },

            async findCityByCityName(cityName: string): Promise<WeatherData> {
                try {
                    return await api.get('', { q: cityName });
                } catch (err) {
                    throw Error()
                }
            },

            updateStorage(): void {
                LocalStorage.setStorage(CITY_LIST_KEY, this.cityList);
            },

            async fetchWeather(): Promise<void> {
                const promises: WeatherData[] = []

                for (const city of this.cityList) {
                    promises.push(
                        await api.get('', { id: city.id })
                    )
                }

                const citiesWeather = await Promise.all<WeatherData>(promises)

                this.cityList = this.cityList.map(city => {
                    const weather = citiesWeather.find(cityWeather => cityWeather.id === city.id)
                    if (weather) {
                        city.weatherData = weather
                    }
                    return city
                })
                this.updateStorage()
            },

            newOrder(array: City[]): void {
                this.cityList = array
                this.updateStorage()
            },

            async addCityByLatLng(lat: number, lng: number): Promise<void> {
                const data = await api.get('', { lat: lat, lon: lng }) as WeatherData;
                if (data) {
                    await this.addCity({ id: data.id, lat: lat, lng: lng, name: data.name })
                }
            }
        }
    }
)
