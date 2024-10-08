<template>
    <p>{{x}},{{ y }}</p>
    <h1>LK</h1>
</template>

<script setup lang="ts">
import { useMouse } from '#root/composables/mouse'
const { x, y } = useMouse()
</script>

<style scoped></style>