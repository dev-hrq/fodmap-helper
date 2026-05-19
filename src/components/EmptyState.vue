<script setup lang="ts">
defineProps<{
  query: string
}>()
</script>

<template>
  <section class="empty-state" aria-live="polite">
    <h2>Nao encontramos "{{ query }}"</h2>
    <p>
      Alimento nao encontrado na base inicial. Tente buscar por outro nome ou
      consulte a composicao do alimento.
    </p>
    <p>
      Esse MVP usa uma base estatica inicial. Novos alimentos podem ser
      adicionados futuramente no arquivo JSON.
    </p>
  </section>
</template>
