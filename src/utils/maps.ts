import * as echarts from 'echarts'

const MAP_FILES = {
  cambodia: 'maps/cambodia.json',
  world: 'maps/world.json'
}

let registration: Promise<void> | null = null

export function ensureMapsRegistered(): Promise<void> {
  if (!registration) {
    registration = Promise.all(
      Object.entries(MAP_FILES).map(async ([name, file]) => {
        const response = await fetch(`${import.meta.env.VITE_APP_ASSETS_DIR}${file}`)
        if (!response.ok) {
          throw new Error(`Failed to load map: ${name}`)
        }
        echarts.registerMap(name, await response.json())
      })
    ).then(() => undefined)
  }
  return registration
}
