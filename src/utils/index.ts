import { App, Component } from 'vue'

export type WhithInstall<T> = T & {
  install(app: App): void
} & EventShim

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export function withInstall<T extends Component>(options: T) {
  ;(options as Record<string, unknown>).install = (app: App) => {
    if (options.name) {
      app.component(options.name, options)
    }
  }
  return options as WhithInstall<T>
}
