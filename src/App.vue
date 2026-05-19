<script setup lang="ts">
import { computed, ref } from 'vue'
import EmptyState from './components/EmptyState.vue'
import FoodResultCard from './components/FoodResultCard.vue'
import FoodSearch from './components/FoodSearch.vue'
import foodsData from './data/foods.json'
import type { Food } from './types/food'
import { searchFood } from './utils/foodSearch'

const query = ref('')
const foods = foodsData as Food[]

const results = computed(() => searchFood(foods, query.value))
</script>

<template>
  <main class="app-shell">
    <section class="app-hero" aria-labelledby="app-title">
      <p class="app-hero__eyebrow">FODMAP Helper</p>
      <h1 id="app-title">Encontre alimentos com mais clareza</h1>
      <p class="app-hero__copy">
        Busque na base local e veja uma indicacao inicial de risco FODMAP por
        porcao.
      </p>
    </section>

    <FoodSearch v-model="query" :result-count="results.length" />

    <section v-if="results.length" class="results-grid" aria-label="Resultados">
      <FoodResultCard
        v-for="food in results"
        :key="food.id"
        :food="food"
      />
    </section>

    <EmptyState v-else />
  </main>
</template>
