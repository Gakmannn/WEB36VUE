<template>
  <h1 v-if="bool" @click="str += '!'">{{ str }}</h1>
  <h1 v-else @click="str += '!'">{{ str.split('').reverse().join('') }}</h1>

  {{ myFunc1 }}
  <slot></slot>

  <button v-on:click="myFunc" :style="'color:#' + color">Reverse</button>
</template>

<script lang="ts">
export default {
  data() {
    return { 
      str: 'Learn vue',
      bool: true,
      color: 100000,
    }
  },
  components: {

  },
  computed: {
    myFunc1() {
      return 'fsdsfsf'
    }
  },
  methods: {
    myFunc() {
      this.bool = !this.bool
      this.color += 500
    },
  },
  beforeCreate() {
    console.log('created')
  },
  beforeMount() {
    console.log('onBeforeMount')
  },
  mounted() {
    console.log('onMounted')
  },
  beforeUpdate() {
    console.log('onBeforeUpdate')
  },
  updated() {
    console.log('onUpdated')
  },
  beforeUnmount() {
    console.log('onBeforeUnmount')
  },
  unmounted() {
    console.log('onUnmounted')
  },
}

</script>

<style scoped>
h1 {
  user-select: none;
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
