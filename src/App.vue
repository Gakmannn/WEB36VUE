<template>
  <HeaderComp>
    <RouterLink :to="{name:'home'}">На главную</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/books">Books</RouterLink>
    <RouterLink to="/user">User</RouterLink>
    <button @click="navigate">navigate</button>
  </HeaderComp>

  <!-- {{ route }} -->

  <p> Query: 
  {{ $route.query }}
  </p>
  <p> Hash: 
  {{ $route.hash }}
  </p>

  <RouterView v-if="$router.currentRoute.value.matched.length"></RouterView>
  <h1 v-else>Not found</h1>
  
  <footer style="background:#dedede; height:30px">
    logo
  </footer>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const navigate = ()=>{
  // location.assign('/user?plan=private#nothing')
  router.push({ path: '/user', query: { plan: 'private' }, hash: '#nothing' })
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
