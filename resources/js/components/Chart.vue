<template>
  <div id="chart" class="container">
    <div v-if="arrValues.length > 0"></div>
      <line-chart v-if="Status=='ready'"
        :chartData="arrValues"
        :options="chartOptions"
        :chartColors="chartColors"
        label="ПГПЖ"
      />
  </div>
</template>

<script>
import LineChart from "../charts/LineChart";
import {mapGetters} from "vuex";

export default {
  components: {
    LineChart,
  },
  computed: mapGetters(["Status","HorizontalBarChartSeries"]),
  data() {
    return {
      arrValues: [
        { date: "2015", value: 23686 },
        { date: "2016", value: 22677 },
        { date: "2017", value: 21456 },
        { date: "2018", value: 21089 },
        { date: "2019", value: 20134 },
      ],
      chartColors: {
        borderColor: "#0096ff",
        pointBorderColor: "#0c66a1",
        pointBackgroundColor: "#c9e5ff",
        /*backgroundColor: "#74A57F",*/
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style scoped></style>
