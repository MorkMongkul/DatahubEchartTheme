import type { EChartsOption } from 'echarts'

// Chart configuration interface
interface ChartConfig {
  title: string
  subtitle?: string
  type: string
  option: EChartsOption
}

// Generate random data helper functions
function getRandomValue(max: number = 1000, min: number = 100): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomArray(length: number, max: number = 1000, min: number = 100): number[] {
  return Array.from({ length }, () => getRandomValue(max, min))
}

// Chart configurations
export function getChartConfigs(seriesCnt: number = 4): ChartConfig[] {
  const axisCat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const legendData = Array.from({ length: seriesCnt }, (_, i) => `Series ${i + 1}`)

  const commonTooltip = {
    trigger: 'axis' as const
  }

  const commonToolbox = {
    feature: {
      restore: { show: true },
      saveAsImage: { show: true },
      dataView: { show: true },
      dataZoom: { show: true }
    }
  }

  const donutData = legendData.map(name => ({
    name,
    value: getRandomValue(800, 200)
  }))
  const donutTotal = donutData.reduce((sum, d) => sum + d.value, 0)

  // Must match properties.shapeName in public/maps/cambodia.json
  const cambodiaProvinces = [
    'Bantey Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu',
    'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kratie', 'Mondulkiri',
    'Oddar Meanchey', 'Pailin', 'Phnom Penh', 'Preah Sihanouk', 'Preah Vihear', 'Prey Veng',
    'Pursat', 'Ratanakiri Province', 'Siem Reap', 'Stung Treng', 'Svay Rieng', 'Takeo',
    'Tbong Khmum'
  ]
  // Must match properties.NAME in public/maps/world.json; other countries stay "no data"
  const worldCountries = [
    'China', 'Vietnam', 'Thailand', 'United States of America', 'Japan', 'South Korea',
    'Germany', 'United Kingdom', 'Malaysia', 'Indonesia', 'India', 'Canada', 'Australia',
    'France', 'Russia', 'Brazil'
  ]

  const yearCat = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
  const gaugeValue = getRandomValue(95, 40)

  // [longitude, latitude]: Phnom Penh and sample partner capitals for the flow map
  const tradeOrigin = [104.92, 11.56]
  const tradePartners = [
    { name: 'Hanoi', coord: [105.85, 21.03] },
    { name: 'Bangkok', coord: [100.5, 13.75] },
    { name: 'Beijing', coord: [116.41, 39.9] },
    { name: 'Singapore', coord: [103.82, 1.35] },
    { name: 'Tokyo', coord: [139.69, 35.69] },
    { name: 'Washington', coord: [-77.04, 38.91] },
    { name: 'Berlin', coord: [13.4, 52.52] },
    { name: 'London', coord: [-0.13, 51.51] }
  ]

  const configs: ChartConfig[] = [
    // Line Chart
    {
      title: 'Line Chart',
      subtitle: 'Basic line chart example',
      type: 'line',
      option: {
        title: {
          text: 'Line Chart',
          subtext: 'Basic line chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'line' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          markPoint: {
            data: [{ name: 'Min', type: 'min' }]
          }
        }))
      }
    },

    // Stacked Area Chart
    {
      title: 'Stacked Area Chart',
      subtitle: 'Stacked area chart example',
      type: 'area',
      option: {
        title: {
          text: 'Stacked Area Chart',
          subtext: 'Stacked area chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat,
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'line' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          areaStyle: {},
          stack: 'total'
        }))
      }
    },

    // Bar Chart
    {
      title: 'Bar Chart',
      subtitle: 'Basic bar chart example',
      type: 'bar',
      option: {
        title: {
          text: 'Bar Chart',
          subtext: 'Basic bar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'bar' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          markPoint: {
            data: [{ name: 'Min', type: 'min' }]
          }
        }))
      }
    },

    // Stacked Bar Chart
    {
      title: 'Stacked Bar Chart',
      subtitle: 'Stacked bar chart example',
      type: 'stackedBar',
      option: {
        title: {
          text: 'Stacked Bar Chart',
          subtext: 'Stacked bar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'bar' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          stack: 'total'
        }))
      }
    },

    // Grouped Bar Chart
    {
      title: 'Grouped Bar Chart',
      subtitle: 'Grouped bars with zoom slider',
      type: 'groupedBar',
      option: {
        title: {
          text: 'Grouped Bar Chart',
          subtext: 'Grouped bars with zoom slider'
        },
        legend: {
          data: legendData
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        toolbox: commonToolbox,
        grid: { bottom: 110 },
        dataZoom: [
          { type: 'inside' },
          { type: 'slider', bottom: 45 }
        ],
        xAxis: {
          type: 'category',
          data: yearCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'bar' as const,
          barMaxWidth: 20,
          data: getRandomArray(yearCat.length, 800, 200)
        }))
      }
    },

    // Dual-Axis Chart
    {
      title: 'Dual-Axis Chart',
      subtitle: 'Bars with a line on a second axis',
      type: 'combo',
      option: {
        title: {
          text: 'Dual-Axis Chart',
          subtext: 'Bars with a line on a second axis'
        },
        legend: {
          data: [...legendData, 'Growth (%)']
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: yearCat
        },
        yAxis: [
          { type: 'value' },
          {
            type: 'value',
            axisLabel: { formatter: '{value}%' },
            splitLine: { show: false }
          }
        ],
        series: [
          ...legendData.map(name => ({
            name,
            type: 'bar' as const,
            data: getRandomArray(yearCat.length, 800, 200)
          })),
          {
            name: 'Growth (%)',
            type: 'line' as const,
            yAxisIndex: 1,
            data: getRandomArray(yearCat.length, 12, 2)
          }
        ]
      }
    },

    // Scatter Chart
    {
      title: 'Scatter Chart',
      subtitle: 'Basic scatter chart example',
      type: 'scatter',
      option: {
        title: {
          text: 'Scatter Chart',
          subtext: 'Basic scatter chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'scatter' as const,
          data: Array.from({ length: 32 }, () => [
            getRandomValue(600, 100),
            getRandomValue(600, 100)
          ])
        }))
      }
    },

    // Pie Chart
    {
      title: 'Pie Chart',
      subtitle: 'Basic pie chart example',
      type: 'pie',
      option: {
        title: {
          text: 'Pie Chart',
          subtext: 'Basic pie chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: commonToolbox,
        series: [{
          name: 'Data',
          type: 'pie' as const,
          radius: '50%',
          data: legendData.map(name => ({
            name,
            value: getRandomValue(800, 200)
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    },

    // Donut Chart
    {
      title: 'Donut Chart',
      subtitle: 'Donut chart with center total',
      type: 'donut',
      option: {
        title: {
          text: 'Donut Chart',
          subtext: 'Donut chart with center total'
        },
        legend: {
          orient: 'vertical',
          right: 16,
          top: 'middle',
          data: legendData
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        toolbox: commonToolbox,
        series: [{
          name: 'Data',
          type: 'pie' as const,
          radius: ['48%', '70%'],
          center: ['38%', '58%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: () => `{sub|Total}\n{stat|${donutTotal}}`,
            rich: {
              sub: { fontSize: 12, lineHeight: 18 },
              stat: { fontSize: 26, lineHeight: 32, fontWeight: 700 }
            }
          },
          emphasis: {
            scale: true,
            scaleSize: 6,
            label: { show: true }
          },
          data: donutData
        }]
      }
    },

    // Radar Chart
    {
      title: 'Radar Chart',
      subtitle: 'Basic radar chart example',
      type: 'radar',
      option: {
        title: {
          text: 'Radar Chart',
          subtext: 'Basic radar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        radar: {
          indicator: axisCat.map(name => ({ name, max: 1000 })),
          center: ['50%', '60%']
        },
        series: legendData.map(name => ({
          name,
          type: 'radar' as const,
          data: [{
            value: getRandomArray(axisCat.length, 800, 200),
            name
          }]
        }))
      }
    },

    // Gauge Chart
    {
      title: 'Gauge Chart',
      subtitle: 'Progress towards a target',
      type: 'gauge',
      option: {
        title: {
          text: 'Gauge Chart',
          subtext: 'Progress towards a target'
        },
        tooltip: {
          formatter: '{b}: {c}%'
        },
        toolbox: commonToolbox,
        series: [{
          name: 'Progress',
          type: 'gauge' as const,
          center: ['50%', '64%'],
          radius: '78%',
          progress: { show: true, width: 14 },
          axisLine: { lineStyle: { width: 14 } },
          axisTick: { show: false },
          splitLine: { length: 8 },
          detail: {
            valueAnimation: true,
            formatter: '{value}%'
          },
          data: [{ value: gaugeValue, name: 'Target' }]
        }]
      }
    },

    // Candlestick Chart (K-Line)
    {
      title: 'Candlestick Chart',
      subtitle: 'K-line chart with data zoom',
      type: 'candlestick',
      option: {
        title: {
          text: 'Candlestick Chart',
          subtext: 'K-line chart with data zoom'
        },
        tooltip: {
          trigger: 'axis' as const
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: { show: true },
            dataView: { show: true },
            restore: { show: true }
          }
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 20 }, (_, i) => `Day ${i + 1}`)
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [{
          name: 'Stock Price',
          type: 'candlestick' as const,
          data: Array.from({ length: 20 }, () => {
            const open = getRandomValue(2400, 2200)
            const close = getRandomValue(2400, 2200)
            const low = Math.min(open, close) - getRandomValue(50, 0)
            const high = Math.max(open, close) + getRandomValue(50, 0)
            return [open, close, low, high]
          })
        }]
      }
    },

    // Heatmap
    {
      title: 'Heatmap',
      subtitle: 'Basic heatmap example',
      type: 'heatmap',
      option: {
        title: {
          text: 'Heatmap',
          subtext: 'Basic heatmap example'
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
        },
        yAxis: {
          type: 'category',
          data: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun']
        },
        visualMap: {
          min: 1,
          max: 10,
          calculable: true
        },
        series: [{
          name: 'Heat',
          type: 'heatmap' as const,
          data: Array.from({ length: 84 }, (_, i) => {
            const x = i % 12
            const y = Math.floor(i / 12)
            return [x, y, getRandomValue(10, 1)]
          }),
          label: {
            show: true
          }
        }]
      }
    },

    // Treemap
    {
      title: 'Treemap',
      subtitle: 'Basic treemap example',
      type: 'treemap',
      option: {
        title: {
          text: 'Treemap',
          subtext: 'Basic treemap example'
        },
        tooltip: {
          trigger: 'item' as const,
          formatter: '{b}: {c}'
        },
        toolbox: commonToolbox,
        series: [{
          type: 'treemap' as const,
          data: [
            {
              name: 'Category A',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'A1', value: getRandomValue(300, 100) },
                { name: 'A2', value: getRandomValue(300, 100) },
                { name: 'A3', value: getRandomValue(300, 100) }
              ]
            },
            {
              name: 'Category B',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'B1', value: getRandomValue(300, 100) },
                { name: 'B2', value: getRandomValue(300, 100) }
              ]
            },
            {
              name: 'Category C',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'C1', value: getRandomValue(300, 100) },
                { name: 'C2', value: getRandomValue(300, 100) },
                { name: 'C3', value: getRandomValue(300, 100) },
                { name: 'C4', value: getRandomValue(300, 100) }
              ]
            }
          ]
        }]
      }
    },

    // Sunburst Chart
    {
      title: 'Sunburst Chart',
      subtitle: 'Hierarchy of shares',
      type: 'sunburst',
      option: {
        title: {
          text: 'Sunburst Chart',
          subtext: 'Hierarchy of shares'
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: commonToolbox,
        series: [{
          type: 'sunburst' as const,
          center: ['50%', '58%'],
          radius: ['12%', '75%'],
          label: { minAngle: 15 },
          data: [
            {
              name: 'Sector A',
              children: [
                { name: 'A1', value: 6 },
                { name: 'A2', value: 4 },
                { name: 'A3', value: 3 }
              ]
            },
            {
              name: 'Sector B',
              children: [
                { name: 'B1', value: 5 },
                { name: 'B2', value: 4 }
              ]
            },
            {
              name: 'Sector C',
              children: [
                { name: 'C1', value: 5 },
                { name: 'C2', value: 3 },
                { name: 'C3', value: 2 }
              ]
            }
          ]
        }]
      }
    },

    // Graph/Network Chart
    {
      title: 'Graph Chart',
      subtitle: 'Network graph example',
      type: 'graph',
      option: {
        title: {
          text: 'Graph Chart',
          subtext: 'Network graph example'
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        legend: {
          data: ['Category 0', 'Category 1', 'Category 2', 'Category 3']
        },
        series: [{
          type: 'graph' as const,
          layout: 'force',
          roam: true,
          label: {
            show: true,
            color: 'auto'
          },
          force: {
            repulsion: 400,
            edgeLength: 150
          },
          categories: [
            { name: 'Category 0' },
            { name: 'Category 1' },
            { name: 'Category 2' },
            { name: 'Category 3' }
          ],
          data: [
            { id: '0', name: 'Node 1', symbolSize: 30, value: 30, category: 0 },
            { id: '1', name: 'Node 2', symbolSize: 25, value: 25, category: 1 },
            { id: '2', name: 'Node 3', symbolSize: 35, value: 35, category: 0 },
            { id: '3', name: 'Node 4', symbolSize: 20, value: 20, category: 2 },
            { id: '4', name: 'Node 5', symbolSize: 40, value: 40, category: 1 },
            { id: '5', name: 'Node 6', symbolSize: 28, value: 28, category: 3 },
            { id: '6', name: 'Node 7', symbolSize: 32, value: 32, category: 2 },
            { id: '7', name: 'Node 8', symbolSize: 22, value: 22, category: 0 },
            { id: '8', name: 'Node 9', symbolSize: 38, value: 38, category: 3 },
            { id: '9', name: 'Node 10', symbolSize: 26, value: 26, category: 1 }
          ],
          links: [
            { source: '0', target: '1' },
            { source: '0', target: '2' },
            { source: '1', target: '3' },
            { source: '2', target: '4' },
            { source: '3', target: '5' },
            { source: '4', target: '6' },
            { source: '5', target: '7' },
            { source: '6', target: '8' },
            { source: '7', target: '9' },
            { source: '8', target: '0' },
            { source: '9', target: '2' },
            { source: '1', target: '4' },
            { source: '3', target: '7' },
            { source: '5', target: '9' }
          ],
          lineStyle: {
            curveness: 0.3
          }
        }]
      }
    },

    // Sankey Chart
    {
      title: 'Sankey Chart',
      subtitle: 'Flow between three stages',
      type: 'sankey',
      option: {
        title: {
          text: 'Sankey Chart',
          subtext: 'Flow between three stages'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        toolbox: commonToolbox,
        series: [{
          type: 'sankey' as const,
          top: 70,
          bottom: 20,
          left: 24,
          right: 90,
          nodeWidth: 14,
          nodeGap: 12,
          emphasis: { focus: 'adjacency' },
          lineStyle: {
            color: 'gradient',
            opacity: 0.5,
            curveness: 0.5
          },
          data: [
            { name: 'Source A' }, { name: 'Source B' }, { name: 'Source C' },
            { name: 'Stage 1' }, { name: 'Stage 2' }, { name: 'Stage 3' },
            { name: 'Target X' }, { name: 'Target Y' }
          ],
          links: [
            { source: 'Source A', target: 'Stage 1', value: 8 },
            { source: 'Source A', target: 'Stage 2', value: 5 },
            { source: 'Source B', target: 'Stage 2', value: 6 },
            { source: 'Source B', target: 'Stage 3', value: 4 },
            { source: 'Source C', target: 'Stage 1', value: 3 },
            { source: 'Source C', target: 'Stage 3', value: 7 },
            { source: 'Stage 1', target: 'Target X', value: 7 },
            { source: 'Stage 1', target: 'Target Y', value: 4 },
            { source: 'Stage 2', target: 'Target X', value: 5 },
            { source: 'Stage 2', target: 'Target Y', value: 6 },
            { source: 'Stage 3', target: 'Target X', value: 6 },
            { source: 'Stage 3', target: 'Target Y', value: 5 }
          ]
        }]
      }
    },

    // Chord Chart
    {
      title: 'Chord Chart',
      subtitle: 'Flows between groups',
      type: 'chord',
      option: {
        title: {
          text: 'Chord Chart',
          subtext: 'Flows between groups'
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: commonToolbox,
        series: [{
          type: 'chord' as const,
          center: ['50%', '58%'],
          radius: ['50%', '58%'],
          lineStyle: {
            color: 'gradient',
            opacity: 0.5
          },
          data: [
            { name: 'A' }, { name: 'B' }, { name: 'C' },
            { name: 'D' }, { name: 'E' }, { name: 'F' }
          ],
          links: [
            { source: 'A', target: 'B', value: 12 },
            { source: 'A', target: 'C', value: 8 },
            { source: 'A', target: 'E', value: 5 },
            { source: 'B', target: 'C', value: 9 },
            { source: 'B', target: 'D', value: 6 },
            { source: 'C', target: 'D', value: 7 },
            { source: 'C', target: 'F', value: 4 },
            { source: 'D', target: 'E', value: 10 },
            { source: 'D', target: 'F', value: 6 },
            { source: 'E', target: 'F', value: 8 },
            { source: 'E', target: 'B', value: 5 },
            { source: 'F', target: 'A', value: 7 }
          ]
        }]
      }
    },

    // Map Chart (Cambodia provinces)
    {
      title: 'Cambodia Map',
      subtitle: 'Choropleth by province',
      type: 'map',
      option: {
        title: {
          text: 'Cambodia Map',
          subtext: 'Choropleth by province'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        toolbox: commonToolbox,
        visualMap: {
          min: 0,
          max: 100,
          left: 16,
          bottom: 16,
          text: ['High', 'Low'],
          calculable: true
        },
        series: [{
          name: 'Value',
          type: 'map' as const,
          map: 'cambodia',
          nameProperty: 'shapeName',
          roam: false,
          top: 60,
          label: { show: true, fontSize: 9 },
          labelLayout: { hideOverlap: true },
          data: cambodiaProvinces.map(name => ({
            name,
            value: getRandomValue(100, 5)
          }))
        }]
      }
    },

    // Map Chart (World countries)
    {
      title: 'World Map',
      subtitle: 'Choropleth by country',
      type: 'map',
      option: {
        title: {
          text: 'World Map',
          subtext: 'Choropleth by country'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        toolbox: commonToolbox,
        visualMap: {
          min: 0,
          max: 100,
          orient: 'horizontal',
          left: 'center',
          bottom: 10,
          text: ['High', 'Low'],
          calculable: true
        },
        series: [{
          name: 'Value',
          type: 'map' as const,
          map: 'world',
          nameProperty: 'NAME',
          roam: false,
          top: 70,
          bottom: 50,
          label: { show: false },
          data: worldCountries.map(name => ({
            name,
            value: getRandomValue(100, 5)
          }))
        }]
      }
    },

    // Flow Map (lines on the world map)
    {
      title: 'Flow Map',
      subtitle: 'Sample flows from Phnom Penh',
      type: 'lines',
      option: {
        title: {
          text: 'Flow Map',
          subtext: 'Sample flows from Phnom Penh'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        toolbox: commonToolbox,
        geo: {
          map: 'world',
          nameProperty: 'NAME',
          roam: false,
          top: 70,
          bottom: 20
        },
        series: [
          {
            name: 'Flows',
            type: 'lines' as const,
            coordinateSystem: 'geo',
            symbol: ['none', 'arrow'],
            symbolSize: 6,
            lineStyle: {
              width: 1.5,
              opacity: 0.7,
              curveness: 0.25
            },
            data: tradePartners.map(p => ({
              name: `Phnom Penh to ${p.name}`,
              coords: [tradeOrigin, p.coord]
            }))
          },
          {
            name: 'Partners',
            type: 'scatter' as const,
            coordinateSystem: 'geo',
            symbolSize: 7,
            data: tradePartners.map(p => ({
              name: p.name,
              value: [...p.coord, getRandomValue(100, 20)]
            }))
          }
        ]
      }
    },

    // Timeline Chart
    {
      title: 'Timeline Chart',
      subtitle: 'Timeline with multiple series',
      type: 'timeline',
      option: {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: false,
            data: ['2020', '2021', '2022', '2023'],
            label: {
              formatter: (value: string | number) => value.toString()
            }
          },
          title: {
            text: 'Timeline Chart',
            subtext: 'Timeline with multiple series'
          },
          tooltip: {
            trigger: 'axis' as const
          },
          legend: {
            data: ['Primary', 'Secondary', 'Tertiary']
          },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: {
            type: 'value',
            name: 'Value'
          },
          series: [
            { name: 'Primary', type: 'bar' as const },
            { name: 'Secondary', type: 'bar' as const },
            { name: 'Tertiary', type: 'bar' as const }
          ]
        },
        options: [
          {
            title: { text: 'Timeline Chart - 2020' },
            series: [
              { data: getRandomArray(6, 800, 400) },
              { data: getRandomArray(6, 600, 300) },
              { data: getRandomArray(6, 400, 200) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2021' },
            series: [
              { data: getRandomArray(6, 900, 500) },
              { data: getRandomArray(6, 700, 400) },
              { data: getRandomArray(6, 500, 300) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2022' },
            series: [
              { data: getRandomArray(6, 1000, 600) },
              { data: getRandomArray(6, 800, 500) },
              { data: getRandomArray(6, 600, 400) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2023' },
            series: [
              { data: getRandomArray(6, 1100, 700) },
              { data: getRandomArray(6, 900, 600) },
              { data: getRandomArray(6, 700, 500) }
            ]
          }
        ]
      }
    }
  ]

  return configs
}
