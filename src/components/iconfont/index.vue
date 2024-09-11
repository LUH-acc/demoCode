<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + props.type"></use>
  </svg>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
  })
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
