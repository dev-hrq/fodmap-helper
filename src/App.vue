<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import EmptyState from './components/EmptyState.vue'
import FoodResultCard from './components/FoodResultCard.vue'
import FoodSearch from './components/FoodSearch.vue'
import foodsData from './data/foods.json'
import type { FoodDatabase } from './types/food'
import { flattenFoodDatabase, searchFood } from './utils/foodSearch'

const query = ref('')
const selectedCategory = ref<string | null>(null)
const showBackToTop = ref(false)
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

const updateBackToTopVisibility = () => {
  showBackToTop.value = window.scrollY > 360
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateBackToTopVisibility()
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateBackToTopVisibility)
})
</script>

<template>
  <main class="app-shell">
    <section class="app-hero" aria-labelledby="app-title">
      <h1 id="app-title">FODMAP Helper</h1>
      <h3 id="app-title"><i>Can I Eat?</i></h3>
      <p class="app-hero__copy">
        Consulta rápida para SII e intolerância à lactose
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

    <footer class="app-footer">
      <p>
        Uso pessoal e informativo. Não substitui orientação médica ou nutricional.
      </p>
      <p class="app-footer__credit">
        Desenvolvido por Paulo Henrique de Souza.
        <a
          href="https://github.com/dev-hrq/fodmap-helper"
          target="_blank"
          rel="noreferrer"
        >
          dev-hrq/fodmap-helper
        </a>
        · Site em constante construção.
      </p>
      <p class="app-footer__sources">
        Fontes:
        <a
          href="https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/28646-pof-2017-2018-brasileiro-ainda-mantem-dieta-a-base-de-arroz-e-feijao-mas-consumo-de-frutas-e-legumes-e-abaixo-do-esperado"
          target="_blank"
          rel="noreferrer"
        >
          IBGE POF 2017-2018
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/592d8b94384f3953adc8e73d397c4936.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Tabela POF
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://agenciagov.ebc.com.br/noticias/202403/conheca-os-alimentos-que-compoem-a-nova-cesta-basica"
          target="_blank"
          rel="noreferrer"
        >
          Cesta básica
        </a>
      </p>
    </footer>

    <button
      v-if="showBackToTop"
      type="button"
      class="back-to-top"
      aria-label="Voltar ao topo da página"
      @click="scrollToTop"
    >
      ↑
    </button>
  </main>
</template>
