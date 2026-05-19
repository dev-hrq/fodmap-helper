<script setup lang="ts">
import type { RiskLevel } from '../types/food'

const labels: Record<RiskLevel, string> = {
  low: 'Baixo FODMAP',
  medium: 'Atencao',
  high: 'Alto FODMAP',
}

defineProps<{
  level: RiskLevel
}>()
</script>

<template>
  <span class="risk-badge" :class="`risk-badge--${level}`">
    {{ labels[level] }}
  </span>
</template>
