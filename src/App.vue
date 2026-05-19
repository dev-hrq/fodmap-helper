<script setup lang="ts">
import { computed, ref } from 'vue'
import EmptyState from './components/EmptyState.vue'
import FoodResultCard from './components/FoodResultCard.vue'
import FoodSearch from './components/FoodSearch.vue'
import foodsData from './data/foods.json'
import type { FoodDatabase } from './types/food'
import { flattenFoodDatabase, searchFood } from './utils/foodSearch'

const query = ref('')
const selectedCategory = ref<string | null>(null)
const foodDatabase = foodsData as FoodDatabase
const foods = flattenFoodDatabase(foodDatabase)
const categories = foodDatabase.categories.map((category) => category.namePt)

const filteredByCategory = computed(() => {
  if (!selectedCategory.value) {
    return foods
  }

  return foods.filter((food) => food.category === selectedCategory.value)
})

const results = computed(() => searchFood(filteredByCategory.value, query.value))
</script>

<template>
  <main class="app-shell">
    <section class="app-hero" aria-labelledby="app-title">
      <p class="app-hero__eyebrow">FODMAP Helper</p>
      <h1 id="app-title">Encontre alimentos com mais clareza</h1>
      <p class="app-hero__copy">
        Busque na base local e veja uma indicacao inicial de risco FODMAP por
        porcao, com alternativas quando o alimento exigir mais cuidado.
      </p>
    </section>

    <FoodSearch v-model="query" :result-count="results.length" />

    <aside class="category-list" aria-labelledby="category-list-title">
      <h2 id="category-list-title">Categorias disponiveis</h2>
      <ul>
        <li>
          <button
            type="button"
            class="category-list__button"
            :class="{ 'category-list__button--active': selectedCategory === null }"
            @click="selectedCategory = null"
          >
            Todas
          </button>
        </li>
        <li v-for="category in categories" :key="category">
          <button
            type="button"
            class="category-list__button"
            :class="{ 'category-list__button--active': selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </li>
      </ul>
    </aside>

    <section v-if="results.length" class="results-grid" aria-label="Resultados">
      <FoodResultCard
        v-for="food in results"
        :key="food.id"
        :food="food"
      />
    </section>

    <EmptyState v-else :query="query" />

    <p class="app-disclaimer">
      Conteudo educativo. A tolerancia varia por pessoa e por porcao.
    </p>
  </main>
</template>
