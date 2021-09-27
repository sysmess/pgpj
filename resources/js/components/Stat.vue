<template>
<div id="stat" class="container">
    <a-tabs default-active-key="1">
        <a-tab-pane key="1" >
            <span slot="tab">
            <a-icon type="bar-chart" />
            График
            </span>
            <div class="stat-tab">
                <horizontal-bar-chart label="HorizontalBarChart" height="100%" />
            </div>
        </a-tab-pane>


        <a-tab-pane key="2" v-if="SelectedMunic && SelectedRegion.id != null">
            <span slot="tab">
            <a-icon type="table" />
            Таблица
            </span>

            <a-row class="header-row" type="flex" align="middle">
                <a-col :span="9" class="left">Класс</a-col>
                <a-col :span="5">
                    Россия
                </a-col>
                <a-col :span="5" v-if="SelectedRegion">
                    {{ SelectedRegion.name }}
                </a-col>
                <a-col :span="5">
                    {{ SelectedMunic.name }}
                </a-col>
            </a-row>

            <a-row v-for="Class in Classes" :key="Class.N_class" class="list-row" type="flex" align="middle">
                <a-col :span="9" class="left">
                    {{ Class.Class_str }}
                </a-col>
                <a-col :span="5" v-if="RussiaDataFiltered">
                    <span class="pgpj">{{ numeral(RussiaDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((RussiaDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (RussiaDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
                <a-col :span="5" v-if="SelectedRegionDataFiltered">
                    <span class="pgpj"> {{ numeral(SelectedRegionDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((SelectedRegionDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (SelectedRegionDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
                <a-col :span="5" v-if="SelectedMunicDataFiltered">
                    <span class="pgpj">{{ numeral(SelectedMunicDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((SelectedMunicDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (SelectedMunicDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
            </a-row>
        </a-tab-pane>


        <a-tab-pane key="2" v-if="!SelectedMunic && SelectedRegion.id != null">
            <span slot="tab">
            <a-icon type="table" />
            Таблица
            </span>

            <a-row class="header-row" type="flex" align="middle">
                <a-col :span="10" class="left">Класс</a-col>
                <a-col :span="7">
                    Россия
                </a-col>
                <a-col :span="7" v-if="SelectedRegion">
                    {{ SelectedRegion.name }}
                </a-col>
            </a-row>

            <a-row v-for="Class in Classes" :key="Class.N_class" class="list-row" type="flex" align="middle">
                <a-col :span="10" class="left">
                    {{ Class.Class_str }}
                </a-col>
                <a-col :span="7" v-if="RussiaDataFiltered">
                    <span class="pgpj">{{ numeral(RussiaDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((RussiaDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (RussiaDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
                <a-col :span="7" v-if="SelectedRegionDataFiltered">
                    <span class="pgpj">{{ numeral(SelectedRegionDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((SelectedRegionDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (SelectedRegionDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
            </a-row>
        </a-tab-pane>


        <a-tab-pane key="3" v-if="SelectedRegion.id == null">
            <span slot="tab">
            <a-icon type="table" />
            Таблица
            </span>

            <a-row class="header-row" type="flex" align="middle">
                <a-col :span="16" class="left">Класс</a-col>
                <a-col :span="8">
                    Россия
                </a-col>
            </a-row>

            <a-row v-for="Class in Classes" :key="Class.N_class" class="list-row" type="flex" align="middle">
                <a-col :span="16" class="left">
                    {{ Class.Class_str }}
                </a-col>
                <a-col :span="8" v-if="RussiaDataFiltered">
                    <span class="pgpj">{{ numeral(RussiaDataFiltered.find(item => item.N_class == Class.N_class).PGPJ).format() }} <br></span>
                    <span class="percent">{{ numeral((RussiaDataFiltered.find(f=> f.N_class==Class.N_class).PGPJ) / (RussiaDataFiltered.find(f=> f.N_class==0).PGPJ)).format('0.00%') }}</span>
                </a-col>
            </a-row>
        </a-tab-pane>
    </a-tabs>
</div>
</template>

<script>
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { mapGetters } from "vuex";
import numeral from 'numeral';


export default {
  components: { HorizontalBarChart },
  data() {
    return {
        numeral: numeral
    }
  },
  computed: mapGetters(['Status', 'Classes', 'ClassesCount', 'SelectedRegion', 'SelectedRegionDataFiltered', 'SelectedMunicDataFiltered', 'SelectedMunic', 'RussiaDataFiltered'])
};
</script>

<style scoped>
  .left {
    text-align: left;
  }

  #stat {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
  }
  .header-row {
    font-weight: 600;
    color: #777;
    padding-top: 9px;
    padding-bottom: 8px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .list-row {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .list-row:nth-child(odd) {
    background: #f7f7f7;
  }

  .pgpj {
    color: #777;
    font-weight: 600;
    }
  .percent { color: #999; }
</style>
