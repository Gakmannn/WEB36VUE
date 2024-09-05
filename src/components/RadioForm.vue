<template>
    <div id="v-model-radiobutton">
      <input type="radio" id="one" value="Один" v-model="picked" />
      <label for="one">Один</label>
      <br />
      <input type="radio" id="two" value="Два" v-model="picked" />
      <label for="two">Два</label>
      <br />
      <span>Выбрано: {{ picked }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const picked = ref(null)
</script>