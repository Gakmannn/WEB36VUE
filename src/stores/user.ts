import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type User = {
  login:string,
  image:string,
}

const users = [
  { login: 'abc', pass:'098f6bcd4621d373cade4e832627b4f6', image:''}
]

export const useUser = defineStore('user', () => {
  const user = ref(undefined as undefined | User)
  const logOut = () => {
    user.value = undefined
    location.assign('/')
  }
  const logIn = (login:string, pass:string) => {
    const tempUser = users.find((el)=>el.login==login)
    if (tempUser && tempUser.pass == pass) {
      user.value = {login, image:tempUser.image}
      localStorage.user = JSON.stringify(user.value)
      return ''
    } else {
      return 'Проверьте логин либо пароль'
    }
  }
  const autoLogin = () => {
    if (localStorage.user) {
      const tempUser = JSON.parse(localStorage.user)
      user.value = users.find((el) => el.login == tempUser.login)
    }
  }
  return { user, logIn, logOut, autoLogin }
})