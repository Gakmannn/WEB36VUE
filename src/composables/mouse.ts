import { ref, onMounted, onUnmounted } from 'vue'

// по соглашению имена composables функций начинаются с "use"
export function useMouse() {
  // состояние, инкапсулированное и управляемое composable
  const x = ref(0)
  const y = ref(0)

  // composable может обновлять своё управляемое состояние с течением времени.
  function update(event:MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  

  // composable объект также может подключаться к жизненному циклу своего
  // компонента-владельца для настройки и удаления побочных эффектов.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // представлять управляемое состояние в качестве возвращаемого значения
  return { x, y }
}