<script setup lang="ts">
import { Country } from '../models/country.model';
import CountryItem from './CountryItem.vue';
interface Props {
  countries: Country[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <div
      class="border bg-gray-50 border-gray-300 rounded p-3"
      v-for="(country, index) in countries"
    >
      <CountryItem :country="country" :key="index" />
    </div>
  </div>
</template>
