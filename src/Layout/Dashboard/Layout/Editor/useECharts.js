/* eslint-disable no-unused-expressions */
import { useEffect } from 'react'
import echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'

function useECharts(chartRef, config, theme) {
  let chartInstance = null

  function renderChart() {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current)
    window.onresize = () => {
      // plot.resize();
      chartInstance.resize()
    }
    if (renderedInstance) {
      chartInstance = renderedInstance
    } else {
      chartInstance = echarts.init(chartRef.current, theme)
    }
    chartInstance.clear()
    chartInstance.setOption(config)

    chartInstance.on('click', (params) => {
      console.log('params：', params)
    })
  }

  useEffect(() => {
    try {
      renderChart()
    } catch (error) {
      console.warn(error.message)
    }
  }, [config])

  useEffect(() => () => {
    chartInstance && chartInstance.dispose()
  }, [])
}

export default useECharts
