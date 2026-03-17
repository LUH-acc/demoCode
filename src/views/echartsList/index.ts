import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'

import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export function useEcharts(chart) {
  echarts.use([GridComponent, chart, CanvasRenderer, UniversalTransition])
  return echarts
}
