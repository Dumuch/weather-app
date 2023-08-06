<template>
    <div>
        <h1>{{ currentCity.name }}</h1>
        <h2>test</h2>
    </div>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/weatherWidgetStore';
import { storeToRefs } from 'pinia/dist/pinia';

export default {
    name: 'CurrentCity',
    setup() {
        const store = useWeatherWidgetStore()
        const { currentCity } = storeToRefs(store)
        return { currentCity, store }
    },
};
</script>
