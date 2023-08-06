<template>
    <div class="city-list-container">
        <ul class="city-list">
            <li v-for="(city, i) in store.cityList" :key="city.id">
                <div class="city-item__header">
                    {{ city.name }}, {{ city.weather.sys.country }}
                </div>
                <div class="city-item__body">
                    <div class="city-item__temperature">
                        <img :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
                             class="temperature-image" width="100" height="100" :alt="city.weather.name" />
                        <span class="temperature-number">{{ convertTemp(city.weather.main.temp) }}°C</span>
                    </div>
                    <div class="city-item__feel-like">
                        Feels like {{ convertTemp(city.weather.main.feels_like) }}°C.
                        <template v-for="(item, i) in city.weather.weather" :key="i">
                            {{ capitalized(item.description) }}.
                        </template>
                    </div>

                    <div class="city-item__wind">
                        <img src="src/assets/navigation.png" class="wind-image" width="20" height="20"
                             alt="navigation icon" />
                        {{ city.weather.wind.speed }}m/s SSE
                    </div>

                    <div class="city-item__humidity">
                        Humidity: {{ city.weather.main.humidity }}%
                    </div>

                    <div class="city-item__visibility">
                        Visibility: {{ metersToKm(city.weather.visibility) }}km
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { capitalized, convertTempKelvinToCelsius, metersToKm } from '@/utils/helpers.ts';

export default {
    name: 'CityList',

    setup() {
        const store = useWeatherWidgetStore()
        return { store }
    },
    methods: {
        convertTemp(temp) {
            return convertTempKelvinToCelsius(temp)
        },
        capitalized(str) {
            return capitalized(str)
        },
        metersToKm(meters) {
            return metersToKm(meters)
        }
    }
};
</script>

<style lang="scss">

.city-list {
    display: flex;
    list-style: none;
    flex-direction: column;
}

.city-item__header {
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.city-item__temperature {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
}

.temperature-number {
    font-weight: bold;
    font-size: 2rem;
}

.city-item__feel-like {
    margin-bottom: 0.75rem;
}

.city-item__wind {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
}

.wind-image {
    margin-right: 0.5rem;
}

.city-item__humidity {
    margin-bottom: 0.75rem;
}

.city-item__visibility {
    margin-bottom: 0.75rem;
}


</style>


