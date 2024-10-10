<template>
    <p>{{x}},{{ y }}</p>
    <h1>LK</h1>
    <p>local {{ localCount }} <button @click="localCount++">incr</button></p>
    <p>global {{ globalCount }} <button @click="globalCount++">incr</button></p>
</template>

<script setup lang="ts">
import { useMouse } from '#root/composables/mouse'
import { useCount } from '#root/composables/counter'

const { globalCount, localCount } = useCount()
const { x, y } = useMouse()
</script>

<style scoped></style>