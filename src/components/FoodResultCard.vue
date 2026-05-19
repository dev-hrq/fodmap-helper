<script setup lang="ts">
import type { Food, LactosePresence, RiskLevel } from '../types/food'
import RiskBadge from './RiskBadge.vue'

defineProps<{
  food: Food
}>()

const irritationLabels: Record<RiskLevel, string> = {
  low: 'Baixo',
  medium: 'Medio',
  high: 'Alto',
}

const lactoseLabels: Record<string, string> = {
  false: 'Nao contem lactose',
  true: 'Contem lactose',
  low_or_trace: 'Pode conter tracos',
}

const formatLactose = (containsLactose: LactosePresence): string =>
  lactoseLabels[String(containsLactose)]
</script>

<template>
  <article class="food-card">
    <div class="food-card__header">
      <div>
        <p class="food-card__category">{{ food.category }}</p>
        <h2>{{ food.name }}</h2>
        <p class="food-card__subtitle">{{ food.nameEn }}</p>
      </div>
      <RiskBadge :level="food.irritationLevel" />
    </div>

    <dl class="food-card__details">
      <div>
        <dt>Nivel de incomodo</dt>
        <dd>{{ irritationLabels[food.irritationLevel] }}</dd>
      </div>
      <div v-if="food.containsLactose !== undefined">
        <dt>Lactose</dt>
        <dd>{{ formatLactose(food.containsLactose) }}</dd>
      </div>
    </dl>

    <section class="food-card__recommendation">
      <h3>Recomendacao pratica</h3>
      <p>{{ food.recommendation }}</p>
    </section>

    <p v-if="food.notes" class="food-card__notes">{{ food.notes }}</p>

    <section
      v-if="food.alternatives.length"
      class="food-card__alternatives"
      aria-label="Alternativas melhores da mesma categoria"
    >
      <h3>Alternativas melhores</h3>
      <ul>
        <li v-for="alternative in food.alternatives" :key="alternative">
          {{ alternative }}
        </li>
      </ul>
    </section>
  </article>
</template>
