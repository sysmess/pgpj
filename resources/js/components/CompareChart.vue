<template>
    <div id="compareChart" class="container">

        <div v-if="CompareData">
            <compare-horizontal-bar-chart label="CompareHorizontalBarChart" style="height: auto" />
        </div>
        <div v-else>
            <a-empty />
        </div>

    </div>
</template>

<script>
import CompareHorizontalBarChart from "../charts/CompareHorizontalBarChart";
import {mapGetters} from "vuex";

export default {
  components: {
    CompareHorizontalBarChart,
  },
  computed: mapGetters(['Status', 'Classes', 'ClassesCount', 'SelectedRegion', 'SelectedRegionDataFiltered','RussiaDataFiltered', 'CompareData'])

};
</script>

<style scoped>

</style>
