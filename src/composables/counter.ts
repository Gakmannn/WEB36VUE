import { ref } from 'vue'

// глобальное состояние, создаваемое в области видимости модуля
const globalCount = ref(1)

export function useCount() {
  // локальное состояние, создаваемое для каждого компонента
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}