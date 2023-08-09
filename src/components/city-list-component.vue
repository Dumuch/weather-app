<template>
    <div class="city-list-container">
        <ul class="city-list">
            <li class="city-item" v-for="city in store.cityList" :key="city.id">
                <div class="city-item__header">
                    {{ city.name }}, {{ city.weatherData?.sys.country }}
                </div>
                <div v-if="city.weatherData" class="city-item__body">
                    <div class="city-item__temperature">
                        <img :src="`https://openweathermap.org/img/wn/${city.weatherData.weather[0].icon}@2x.png`"
                             class="temperature-image" width="100" height="100" :alt="city.weatherData?.name" />
                        <span class="temperature-number">{{ convertTemp(city.weatherData?.main.temp) }}°C</span>
                    </div>
                    <div class="city-item__feel-like">
                        Feels like {{ convertTemp(city.weatherData?.main.feels_like) }}°C.
                        <template v-for="(item, i) in city.weatherData.weather" :key="i">
                            {{ capitalized(item.description) }}.
                        </template>
                    </div>

                    <div class="city-item__wind">
                        <img src="/src/assets/navigation.png" class="wind-image" width="20" height="20"
                             alt="navigation icon" />
                        {{ city.weatherData?.wind.speed }}m/s SSE
                    </div>

                    <div class="city-item__humidity">
                        Humidity: {{ city.weatherData?.main.humidity }}%
                    </div>

                    <div class="city-item__visibility">
                        Visibility: {{ metersToKm(city.weatherData?.visibility) }}km
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { capitalized, convertTempKelvinToCelsius, metersToKm } from '@/utils/helpers';

export default {
    name: 'CityList',

    setup() {
        const store = useWeatherWidgetStore()
        return { store }
    },
    methods: {
        convertTemp(temp: number) {
            return convertTempKelvinToCelsius(temp)
        },
        capitalized(str: string) {
            return capitalized(str)
        },
        metersToKm(meters: number) {
            return metersToKm(meters)
        }
    }
};
</script>

<style lang="scss" scoped>

.city-list {
    display: flex;
    list-style: none;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

.city-item {
    margin-top: 15px;
    margin-bottom: 15px;
}

.city-item:first-child {
    margin-top: 0;
}

.city-item:last-child {
    margin-bottom: 0;
}

.city-item__header {
    font-weight: bold;
    font-size: 1rem;
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


