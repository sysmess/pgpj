<template>
  <div id="home">
    <h1>Потерянные годы потенциальной жизни / Potential Years of Life Lost</h1>
    <a-row>
      <a-col :md="24" :lg="12">
        <Map />
        <Chart />
      </a-col>
      <a-col :md="24" :lg="12">
        <Stat />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import Chart from "../components/Chart.vue";
import Stat from "../components/Stat.vue";

export default {
  name: "Home",
  components: {
    Map,
    Stat,
    Chart,
  },
};
</script>

<style scoped>
.right {
  text-align: right;
  padding-right: 20px;
}
.left {
  text-align: left;
  padding-left: 20px;
}
</style>
