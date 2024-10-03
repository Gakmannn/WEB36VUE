<template>
  <div v-if="!userStore.user" style="max-width: 300px; margin:100px auto; border-radius: 10px; border: 1px solid #DEDEDE; padding:20px;">
    <form @submit.prevent="logIn" style="display:flex; flex-direction: column; gap:20px">
      <input type="text" placeholder="login" v-model="login">
      <input type="password" placeholder="pass" v-model="pass">
      {{ md5(pass) }}
      <p v-if="error">{{ error }}</p>
      <input type="submit" value="Login">
    </form>
  </div>
  <div v-else style="max-width: 300px; margin:100px auto; border-radius: 10px; border: 1px solid #DEDEDE; padding:20px;">
    <h2>Добро подаловать, {{ userStore.user?.login }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '#root/stores/user'
import md5 from 'md5'
const userStore = useUser()
const login = ref('')
const pass = ref('')
const error = ref('')

const logIn = () => {
  if (login.value && pass.value) {
    error.value = userStore.logIn(login.value, md5(pass.value))
  } else {
    error.value = 'Не введён логин либо пароль'
  }
}

</script>

<style scoped></style>