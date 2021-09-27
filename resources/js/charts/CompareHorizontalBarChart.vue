<template>
    <a-spin v-if="Status=='ready'" :spinning="false">
        <apexchart v-if="Status=='ready'" ref="realtimeChart" type="bar" :options="chartOptions" :series="CompareHorizontalBarChartSeries" height="1440px"></apexchart>
    </a-spin>
    <a-spin v-else :spinning="true">

    </a-spin>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import numeral from "numeral";

export default {
    computed: mapGetters(["Status","CompareHorizontalBarChartSeries"]),
    data: () => ({
     series: [
        { data: [ 10445, 400, 1324, 22, 205, 9, 135, 2475, 299, 626, 2044, 2900 ] },
        { data: [ 11625, 620, 1372, 16, 121, 76, 277, 2517, 333, 792, 2260, 3236 ] }
     ],
     chartOptions: {
         chart: {
             id: 'barchart',
             type: 'bar',
             toolbar: {
                 show: false,
             },
         },
         plotOptions: {
             bar: {
                 horizontal: true,
                 borderRadius: 4,
                 barHeight: '80%',
                 distributed: false,
                 dataLabels:
                     {
                         position: 'top',
                     },
             }
         },
         colors: ['#0096ff', '#e00404', '#13d8aa', '#ff9d09', '#69d2e7', '#2b908f', '#90ee7e'],
         legend: {
             position: "top",
             verticalAlign: "top",
             containerMargin:{
                 left: 40,
                 right: 60
             },
             onItemClick: {toggleDataSeries: false},
         },
         dataLabels: {
             enabled: true,
             offsetX: 36,
             style: {
                 fontSize: '12px',
                 colors: ['#888']
             },
             formatter: function (val, opts) {
                return numeral(val).format()
             },
         },
         stroke: {
             show: true,
             width: 1,
             colors: ['#fff']
         },
         tooltip: {
             enabled: false,
             shared: false,
             intersect: true
         },
         yaxis: {
             labels: {
                 show: true,
                 rotate: 0,
                 rotateAlways: false,
                 hideOverlappingLabels: true,
                 showDuplicates: true,
                 trim: false,
                 minHeight: 60,
                 maxHeight: 220,
                 style: {
                     colors: [],
                     fontSize: '12px',
                     fontFamily: 'Helvetica, Arial, sans-serif',
                     fontWeight: 400,
                     cssClass: 'apexcharts-xaxis-label',
                 },
                 offsetX: 0,
                 offsetY: 0,
             },
         },
         xaxis: {
             categories: [
                 ["Все причины"],
                 ["Инфекционные и", "паразитарные болезни"],
                 ["Новообразования"],
                 [
                     "Болезни крови, кроветворных ",
                     "органов и отдельные нарушения, ",
                     "вовлекающие иммунный механизм",
                 ],
                 [
                     "Болезни эндокринной системы, ",
                     "расстройства питания и ",
                     "нарушения обмена веществ",
                 ],
                 ["Психические расстройства и ", "расстройства поведения"],
                 ["Болезни нервной системы"],
                 ["Болезни глаза и его ", "придаточного аппарата"],
                 ["Болезни уха и сосцевидного отростка"],
                 ["Болезни системы кровообращения"],
                 ["Болезни органов дыхания"],
                 ["Болезни органов пищеварения"],
                 ["Внешние причины"],
                 ["Другие причины"],
             ],
         }
     }
  })
};
</script>
