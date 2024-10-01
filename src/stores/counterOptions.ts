import { defineStore } from 'pinia'

export const useCounter = defineStore('counter1', {
  state: () => (
    { 
      count: 0, 
      name: 'Иван',
      sdfs: ''
    }
  ),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})