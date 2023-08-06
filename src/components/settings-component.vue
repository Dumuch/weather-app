<template>
    <div class="settings">
        <div class="settings-header">Settings</div>
        <div class="settings__city-list">
            <SlickList class="city-list" axis="y" v-model:list="weatherWidgetStore.cityList" @update:list="updateSort">
                <SlickItem class="city-item" v-for="(city, i) in weatherWidgetStore.cityList" :key="city.id" :index="i">
                    <div class="city-item__burger-button"></div>
                    <div class="city-item__name">
                        {{ city.name }}, {{ city.weatherData?.sys.country }}
                    </div>
                    <button class="city-item__delete-button" @click="deleteCity(city.id)">delete</button>
                </SlickItem>
            </SlickList>
        </div>

        <div class="settings__add-city">
            <div class="add-city__header">
                <span class="add-city__title">Add Location:</span>
                <span class="add-city__error-message" v-if="isNotFound && cityName.length !== 0">Not found</span>
            </div>
            <div class="add-city__body">
                <input class="add-city__input" v-model="cityName" @input="findCity" />
                <button class="add-city__button" :disabled="isNotFound || isLoading" @click="addCity">Add</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { convertTempKelvinToCelsius } from '@/utils/helpers';
import { SlickList, SlickItem } from 'vue-slicksort';
import type { City, WeatherData } from '@/models/WeatherWidgetModel';

export default {
    name: 'Settings',
    components: {
        SlickList,
        SlickItem,
    },
    data() {
        return {
            isNotFound: true,
            currentWeatherCity: null as WeatherData | null,
            cityName: '',
            isLoading: false,
        }
    },
    setup() {
        const weatherWidgetStore = useWeatherWidgetStore()
        return { weatherWidgetStore }
    },

    methods: {
        deleteCity(cityId : number) {
            this.weatherWidgetStore.deleteCity(cityId)
        },
        convertTemp(temp: number) {
            return convertTempKelvinToCelsius(temp)
        },
        updateSort(newOrder: City[]) {
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
            if (this.currentWeatherCity) {
                this.weatherWidgetStore.addCity({
                    id: this.currentWeatherCity.id,
                    lat: this.currentWeatherCity.coord.lat,
                    lng: this.currentWeatherCity.coord.lon,
                    name: this.currentWeatherCity.name
                })
                this.cityName = '';
            }
        }
    },

};
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: var(--vt-c-white);
}

.settings-header {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.city-list {
    margin-bottom: 1rem;
}

.city-item {
    display: flex;
    align-items: center;
    background-color: var(--vt-c-divider-light-2);
    padding: 0.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.city-item__burger-button,
.city-item__burger-button::before,
.city-item__burger-button::after {
    cursor: pointer;
    display: block;
    background-color: var(--vt-c-black);
    position: absolute;
    height: 2px;
    width: 15px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 1px;
}

.city-item__burger-button::before {
    content: '';
    margin-top: -4px;
}

.city-item__burger-button::after {
    content: '';
    margin-top: 4px;
}

.city-item__name {
    margin-left: 25px;
}

.city-item__delete-button {
    width: 20px;
    height: 20px;
    margin: 0 0 0 auto;
    padding: 0;
    background-color: transparent;
    background-image: url("/src/assets/delete.svg");
    background-size: contain;
    border: none;
    font-size: 0;
    cursor: pointer;

}

.settings__add-city {
    display: flex;
    flex-direction: column;
}

.add-city__header {
    display: flex;
}

.add-city__title {
    font-weight: bold;
    font-size: 0.75rem;
}

.add-city__error-message {
    margin-left: 6px;
    font-size: 0.75rem;
}

.add-city__body {
    display: flex;
}

.add-city__input {
    flex-grow: 1;
}

.add-city__button {
    width: 20px;
    height: 20px;
    margin: 0 0 0 1rem;
    background-color: transparent;
    padding: 0;
    border: 0;
    background-image: url("/src/assets/arrow_enter.svg");
    background-size: contain;
    font-size: 0;
    cursor: pointer;
}

.add-city__button:disabled {
    opacity: 0.5;
}

</style>
