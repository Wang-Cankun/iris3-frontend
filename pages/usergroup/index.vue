<template>
  <v-container>
    <head>
      <meta charset="utf-8" />
      <!-- 引入 ECharts 文件 -->
      <script src="echarts.min.js"></script>
    </head>
    <body>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px; height: 400px;"></div>
    </body>
  </v-container>
</template>

<script>
import * as echarts from 'echarts'

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('main'))
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
})
</script>
