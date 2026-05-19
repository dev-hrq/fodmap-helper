<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import EmptyState from './components/EmptyState.vue'
import FoodResultCard from './components/FoodResultCard.vue'
import FoodSearch from './components/FoodSearch.vue'
import foodsData from './data/foods.json'
import type { FoodDatabase } from './types/food'
import { flattenFoodDatabase, searchFood } from './utils/foodSearch'

type Theme = 'light' | 'dark'

const themeStorageKey = 'fodmap-helper-theme'
const query = ref('')
const selectedCategory = ref<string | null>(null)
const showBackToTop = ref(false)
const currentTheme = ref<Theme>('light')
const foodDatabase = foodsData as FoodDatabase
const foods = flattenFoodDatabase(foodDatabase)
const categories = foodDatabase.categories.map((category) => category.namePt)
let colorSchemeQuery: MediaQueryList | null = null

const filteredByCategory = computed(() => {
  if (!selectedCategory.value) {
    return foods
  }

  return foods.filter((food) => food.category === selectedCategory.value)
})

const results = computed(() => searchFood(filteredByCategory.value, query.value))
const resultCount = computed(() => results.value.length)
const themeButtonLabel = computed(() =>
  currentTheme.value === 'dark' ? 'Usar tema claro' : 'Usar tema escuro',
)

const updateBackToTopVisibility = () => {
  showBackToTop.value = window.scrollY > 360
}

const applyTheme = (theme: Theme) => {
  currentTheme.value = theme
  document.documentElement.dataset.theme = theme
}

const getDeviceTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const syncThemeWithDevice = () => {
  if (!localStorage.getItem(themeStorageKey)) {
    applyTheme(getDeviceTheme())
  }
}

const toggleTheme = () => {
  const nextTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem(themeStorageKey, nextTheme)
  applyTheme(nextTheme)
}

const updateQuery = (value: string) => {
  query.value = value

  if (value.trim()) {
    selectedCategory.value = null
  }
}

const selectCategory = (category: string | null) => {
  selectedCategory.value = category
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  applyTheme((localStorage.getItem(themeStorageKey) as Theme | null) ?? getDeviceTheme())
  colorSchemeQuery.addEventListener('change', syncThemeWithDevice)
  updateBackToTopVisibility()
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
})

onBeforeUnmount(() => {
  colorSchemeQuery?.removeEventListener('change', syncThemeWithDevice)
  window.removeEventListener('scroll', updateBackToTopVisibility)
})
</script>

<template>
  <main class="app-shell">
    <section class="app-hero" aria-labelledby="app-title">
      <div class="app-hero__topline">
        <div>
          <h1 id="app-title">FODMAP Helper</h1>
          <p class="app-hero__tagline"><i>Can I Eat?</i></p>
        </div>
        <button
          type="button"
          class="theme-toggle"
          :aria-label="themeButtonLabel"
          @click="toggleTheme"
        >
          <span class="material-symbols-rounded" aria-hidden="true">
            {{ currentTheme === 'dark' ? 'light_mode' : 'dark_mode' }}
          </span>
          {{ currentTheme === 'dark' ? 'Claro' : 'Escuro' }}
        </button>
      </div>
      <p class="app-hero__copy">
        Consulta rápida para SII e intolerância à lactose
      </p>
    </section>

    <FoodSearch
      :model-value="query"
      :result-count="resultCount"
      @update:model-value="updateQuery"
    />

    <aside class="category-list" aria-labelledby="category-list-title">
      <h2 id="category-list-title">
        <span class="material-symbols-rounded" aria-hidden="true">category</span>
        Categorias disponiveis
      </h2>
      <ul>
        <li>
          <button
            type="button"
            class="category-list__button"
            :class="{ 'category-list__button--active': selectedCategory === null }"
            @click="selectCategory(null)"
          >
            <span class="material-symbols-rounded" aria-hidden="true">apps</span>
            Todas
          </button>
        </li>
        <li v-for="category in categories" :key="category">
          <button
            type="button"
            class="category-list__button"
            :class="{ 'category-list__button--active': selectedCategory === category }"
            @click="selectCategory(category)"
          >
            <span class="material-symbols-rounded" aria-hidden="true">label</span>
            {{ category }}
          </button>
        </li>
      </ul>
      <p v-if="selectedCategory" class="category-list__active">
        Filtrando por {{ selectedCategory }}.
        <button type="button" @click="selectCategory(null)">
          Limpar filtro
        </button>
      </p>
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
        <span class="material-symbols-rounded" aria-hidden="true">health_and_safety</span>
        Uso pessoal e informativo. Não substitui orientação médica ou nutricional.
      </p>
      <p class="app-footer__credit">
        <span class="material-symbols-rounded" aria-hidden="true">code</span>
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
        <span class="material-symbols-rounded" aria-hidden="true">source</span>
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
      <span class="material-symbols-rounded" aria-hidden="true">keyboard_arrow_up</span>
    </button>
  </main>
</template>
