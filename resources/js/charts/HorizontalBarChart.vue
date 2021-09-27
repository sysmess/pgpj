<template>
    <apexchart v-if="Status=='ready'" ref="realtimeChart" type="bar" :options="chartOptions" :series="HorizontalBarChartSeries" height="100%"></apexchart>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import numeral from 'numeral';

export default {
    computed: mapGetters(["Status","HorizontalBarChartSeries"]),
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
                 barHeight: '70%',
                 distributed: false,
                 dataLabels:
                     {
                         position: 'top',
                     },
             }
         },
         colors: ['#0096ff', '#e00404', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
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
                 minWidth: 0,
                 maxWidth: 260,
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
                 ["Болезни уха и", "сосцевидного отростка"],
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

<style scoped>

</style>
