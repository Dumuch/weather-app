<template>
    <div class="weather-widget">
        <button class="settings-toggle" :class="isOpenSettings ? 'settings-toggle_open' : ''" @click="toggleSettings">
            <span class="settings-toggle__burger"></span>Open settings
        </button>
        <settings v-if="isOpenSettings" />
        <template v-else>
            <p v-if="cityList.length === 0">
                City not added
            </p>
            <city-list v-else />
        </template>
    </div>
</template>

<script>
import CityList from '@/components/city-list-component.vue';
import { Geocoder } from '@/service/geocoder/index.ts';
import Settings from '@/components/settings-component.vue';
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore.ts';
import { storeToRefs } from 'pinia/dist/pinia';

export default {
    name: 'WeatherWidget',
    data() {
        return {
            isOpenSettings: false
        }
    },
    components: { Settings, CityList },
    setup() {
        const weatherWidgetStore = useWeatherWidgetStore()
        const { cityList } = storeToRefs(weatherWidgetStore)

        return { weatherWidgetStore, cityList }
    },
    async mounted() {
        this.weatherWidgetStore.getCityFromLocalStorage()
        await this.weatherWidgetStore.fetchWeather()
        if (this.cityList.length === 0) {
            try {
                const geocoder = new Geocoder();
                const currentWeatherCity = await geocoder.getCurrentPosition();
                await this.weatherWidgetStore.addCityByLatLng(
                    currentWeatherCity.coords.latitude,
                    currentWeatherCity.coords.longitude,
                )
            } catch (e) {
            }
        }
    },

    methods: {
        toggleSettings() {
            this.isOpenSettings = !this.isOpenSettings
        },
    }
};
</script>

<style lang="scss">
.weather-widget {
    margin-top: 50px;
    margin-bottom: 50px;
    position: relative;
    width: 300px;
    max-width: 100%;
}

.settings-toggle {
    position: absolute;
    top: 0;
    right: 6px;
    font-size: 0;
    border: 0;
    height: 20px;
    width: 30px;
    padding: 0;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;

}

.settings-toggle__burger,
.settings-toggle__burger::before,
.settings-toggle__burger::after {
    display: block;
    background-color: var(--vt-c-black);
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
    cursor: pointer;

}

.settings-toggle__burger::before {
    content: '';
    margin-top: -8px;
}

.settings-toggle__burger::after {
    content: '';
    margin-top: 8px;
}

.settings-toggle_open .settings-toggle__burger::before {
    margin-top: 0;
    transform: rotate(405deg);
}

.settings-toggle_open .settings-toggle__burger {
    background: rgba(255, 255, 255, 0);
}

.settings-toggle_open .settings-toggle__burger::after {
    margin-top: 0px;
    transform: rotate(-405deg);
}
</style>
