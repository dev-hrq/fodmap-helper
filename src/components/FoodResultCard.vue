<script setup lang="ts">
import type { Food } from '../types/food'
import RiskBadge from './RiskBadge.vue'

defineProps<{
  food: Food
}>()
</script>

<template>
  <article class="food-card">
    <div class="food-card__header">
      <div>
        <p class="food-card__category">{{ food.category }}</p>
        <h2>{{ food.name }}</h2>
      </div>
      <RiskBadge :level="food.riskLevel" />
    </div>

    <dl class="food-card__details">
      <div>
        <dt>Porcao</dt>
        <dd>{{ food.servingSize }}</dd>
      </div>
      <div>
        <dt>Grupos FODMAP</dt>
        <dd>{{ food.fodmapGroups.join(', ') }}</dd>
      </div>
    </dl>

    <p v-if="food.notes" class="food-card__notes">{{ food.notes }}</p>
  </article>
</template>
