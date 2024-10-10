export const myDirs = {
  install: (app: any) => {
    app.directive('highlight', {
      mounted: (el: HTMLElement) => {
        el.style.backgroundColor = 'yellow'
      }
    })
    app.directive('color', (el: HTMLElement, binding: any) => {
      el.style.backgroundColor = binding.value
    })
  }
}