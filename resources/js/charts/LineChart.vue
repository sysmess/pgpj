<template>
    <apexchart type="line" :options="options" :series="LineChartSeries" height="100%"></apexchart>
</template>

<script>
import {mapGetters} from "vuex";
import numeral from 'numeral';

export default {
  computed: mapGetters(["Status","LineChartSeries"]),
  data: () => ({
    options: {
        chart: {
          id: 'linechart',
          toolbar: {show: false,},
          stroke: { curve: 'smooth'},
          height: 'auto',
        },
        markers: { size: 1 },
        colors: ['#0096ff', '#e00404'],
        dataLabels: {
          enabled: true,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '12px',
            colors: ['#888']
          },
          formatter: function (val, opts) {
                return numeral(val).format()
             },
        },
        tooltip: {
             enabled: false,
             shared: false,
             intersect: true
         },
        xaxis: {
          categories: [2015, 2016, 2017, 2018, 2019],
        },
    },
    series: [{
        name: "ПГПЖ",
        data: [23686, 22677, 21456, 21089, 20134],
        }],
  })
};
</script>
