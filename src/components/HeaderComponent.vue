<template>
  <div>
    <div><button @click="changeTheme">Сметинь тему</button></div>
    <div>
      <h1 v-if="bool" @click="str += '!'">{{ str }}{{ counterStore.count }}</h1>
      <h1 v-else @click="str += '!'">{{ str.split('').reverse().join('') }}{{ counterStore.name }}</h1>

      <slot>
        <h3>Header default</h3>
      </slot>

      <button :class="$attrs.class" v-on:click="myFunc" :style="'color:#' + color">Reverse</button>
      <button v-on:click="counterStore.increment">Incr</button>
    </div>

    <Teleport to="body">
      <div style="position: fixed; right:10px; top:10px">👩</div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, onBeforeUnmount } from 'vue'
import { useCounterStore } from '#root/stores/counterCompos'

const changeTheme = ()=>{
  document.documentElement.className = document.documentElement.className == 'theme_dark' ? 'theme_light' : 'theme_dark'
}

const counterStore = useCounterStore()

console.log('created')

onBeforeMount(()=>{
  console.log('onBeforeMount')
})
onMounted(()=>{
  console.log('onMounted')
})
onBeforeUpdate(()=>{
  console.log('onBeforeUpdate')
})
onUpdated(()=>{
  console.log('onUpdated')
})
onBeforeUnmount(()=>{
  console.log('onBeforeUnmount')
})
onUnmounted(()=>{
  console.log('onUnmounted')
})

const str = ref('Learn vue')
const bool = ref(true)
const color = ref(100000)

const myFunc = () => {
  bool.value = !bool.value
  color.value += 500
}

</script>

<style scoped>
h1 {
  user-select: none;
}
</style>
