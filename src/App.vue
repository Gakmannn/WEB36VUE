<template>
  <HeaderComp>
    <RouterLink class="link" :to="{name:'home'}">На главную</RouterLink>
    <RouterLink class="link" to="/about">About</RouterLink>
    <RouterLink class="link" to="/books">Books</RouterLink>
    <RouterLink class="link" to="/user">User</RouterLink>
    <RouterLink class="link" to="/idbm">Idbm</RouterLink>
    <RouterLink v-if="userStore.user" class="link" to="/lk">LK</RouterLink>
    <button @click="navigate">navigate</button>
    <RouterLink v-if="!userStore.user" class="link" to="/login">LogIn</RouterLink>
    <button v-else @click="userStore.logOut">LogOut</button>
  </HeaderComp>

  <!-- {{ route }} -->

  <!-- <p> Query:
    {{ $route.query }}
  </p>
  <p> Hash:
    {{ $route.hash }}
  </p> -->
  <RouterView v-if="$router.currentRoute.value.matched.length"></RouterView>
  <h1 v-else>Not found</h1>

  <footer style="background:#dedede; height:30px">
    logo
  </footer>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from '#root/stores/user'
import { onMounted } from 'vue'
const userStore = useUser()
const router = useRouter()

userStore.autoLogin()

const navigate = ()=>{
  // location.assign('/user?plan=private#nothing')
  router.push({ path: '/user', query: { plan: 'private' }, hash: '#nothing' })
}

onMounted(()=>{
  const isDark = window.matchMedia("(prefers-color-scheme: dark)")
  if (isDark.matches) {
    document.documentElement.className='theme_dark'
  }
  const myColor = '#213547'
  const myBgColor = '#fff'
  const myAColor = '#747bff'
  const myBBgColor = '#f9f9f9'

  const style = `
  <style>
    :root {
      --main-color-light: ${myColor};
      --main-color-dark:  #fff;
      --main-bg-color-light: ${myBgColor};
      --main-bg-color-dark: #213547;
      --main-a-hover-color-light: ${myAColor};
      --main-a-hover-color-dark: #747bff;
      --main-button-bg-color-light: ${myBBgColor};
      --main-button-bg-color-dark: #43484b;
    }
  </style>
  `
  document.head.insertAdjacentHTML('beforeend',style)
})

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

.link {
  display: inline-block;
  margin: 0 10px;
}
</style>
