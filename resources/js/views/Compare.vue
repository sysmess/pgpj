<template>
  <div class="compare">
    <h1>Сравнение регионов</h1>
    <a-row>
      <a-col :md="24" :lg="12">
        <CompareStat />
      </a-col>
      <a-col :md="24" :lg="12">
        <CompareChart />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import StatFilter from "../components/StatFilter.vue";
import CompareStat from "../components/CompareStat.vue";
import CompareChart from "../components/CompareChart.vue";

export default {
  name: "Compare",
  components: {
    StatFilter,
    CompareStat,
    CompareChart,
  },
};
</script>
