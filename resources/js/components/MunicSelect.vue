<template>
<a-spin v-if="Status=='ready'" :spinning="false">
    <div id="munic_select" class="container">
        <a-icon type="table" />
        Таблица

        <a-row>
            <a-col :span="12" class="left">Класс</a-col>
            <a-col :span="6">
                Россия
            </a-col>
            <a-col :span="6">
                {{ SelectedRegion.name }}
            </a-col>
        </a-row>

        <a-row v-for="Class in Classes" :key="Class.N_class">
            <a-col :span="12" class="left">
                {{ Class.Class_str }}
            </a-col>
            <a-col :span="6" v-if="RussiaDataFiltered">
                {{ RussiaDataFiltered.find(item => item.N_class == Class.N_class).PGPJ }}
            </a-col>
            <a-col :span="6" v-if="SelectedRegionDataFiltered">
                {{ SelectedRegionDataFiltered.find(item => item.N_class == Class.N_class).PGPJ }}
            </a-col>
        </a-row>
    </div>
</a-spin>
<a-spin v-else :spinning="true"></a-spin>
</template>

<script>
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { mapGetters } from "vuex";


export default {
  components: { HorizontalBarChart },
  computed: mapGetters(['Status', 'Classes', 'ClassesCount', 'SelectedRegion', 'SelectedRegionDataFiltered','RussiaDataFiltered'])
};
</script>

<style scoped>
  .left {
    text-align: left;
  }
  .ant-row {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
