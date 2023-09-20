<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import CountriList from './components/CountryList.vue';
import PageHeader from './components/PageHeader.vue';
import { Country } from './models/country.model';
import axiosCliente from './utils/axios';

const countries = ref<Country[]>([]);
const search = ref('');
const filteredCountries = ref<Country[]>([]);
const page = ref(1);
const itensPerPage = ref(12);
const paginatedCountries = ref<Country[]>([]);
const totalItens = ref(0);

const fetchCountries = async () => {
  try {
    const { data } = await axiosCliente.get('/all');
    countries.value = data;
    totalItens.value = countries.value.length;
  } catch (error) {
    console.log(error);
  }
};

const filterCountries = () => {
  filteredCountries.value = countries.value.filter((country) =>
    country.name.common
      .toLocaleLowerCase()
      .includes(search.value.toLocaleLowerCase())
  );
};

const sliceCoutries = (currentCountries: Country[]) => {
  const start = (page.value - 1) * itensPerPage.value;
  const end = page.value * itensPerPage.value;
  paginatedCountries.value = currentCountries.slice(start, end);
};

const changePage = (newPage: number) => {
  page.value = newPage;
};

onMounted(() => {
  fetchCountries();
});

watch([countries, page, filteredCountries], () => {
  sliceCoutries(
    filteredCountries.value.length <= 0 && search.value === ''
      ? countries.value
      : filteredCountries.value
  );
});
</script>

<template>
  <PageHeader />
  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
      <input
        type="text"
        class="border border-gray-300 rounded w-full p-1 px-4"
        placeholder="Search by country name"
        v-model="search"
        @input="filterCountries"
      />
    </div>
    <div class="mb-8 flex justify-center space-x-6">
      <button
        :disabled="page <= 1"
        :class="{ 'opacity-50': page <= 1 }"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
        @click="changePage(page - 1)"
      >
        Previous
      </button>
      <button
        :disabled="page >= totalItens / itensPerPage"
        :class="{ 'opacity-50': page >= totalItens / itensPerPage }"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
        @click="changePage(page + 1)"
      >
        Next
      </button>
    </div>
    <CountriList :countries="paginatedCountries" />
  </div>
</template>
