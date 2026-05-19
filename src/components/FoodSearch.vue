<script setup lang="ts">
defineProps<{
  modelValue: string
  resultCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <form class="food-search" role="search" @submit.prevent>
    <label class="food-search__label" for="food-search-input">
      <span class="material-symbols-rounded" aria-hidden="true">search</span>
      Qual alimento voce quer consultar?
    </label>
    <div class="food-search__control">
      <input
        id="food-search-input"
        :value="modelValue"
        type="search"
        placeholder="Digite um alimento, ex: leite, cebola, maçã..."
        autocomplete="off"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="modelValue"
        type="button"
        class="food-search__clear"
        aria-label="Limpar busca"
        @click="emit('update:modelValue', '')"
      >
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
      </button>
    </div>
    <p class="food-search__meta">
      <span class="material-symbols-rounded" aria-hidden="true">list_alt</span>
      {{ resultCount }} alimento{{ resultCount === 1 ? '' : 's' }} na lista
    </p>
  </form>
</template>
