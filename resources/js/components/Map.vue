<template>
  <div id="map">
      <a-tabs default-active-key="1" tab-position="bottom">
            <a-tab-pane key="1" tab="Карта">
                <div id="map-block">
                    <radio-svg-map v-if="Status=='ready'" v-model="SelectedRegion.id" :map="Russia" />
                    <div class="gradient-bar" :style="RegionsColorsStyle"></div>
                </div>
            </a-tab-pane>

            <a-tab-pane key="2" tab="Муниципалитеты" :disabled="!SelectedRegion.haveMunic">
                <div id="munics-container" class="container">
                    <div class="munic-tab">
                        <a-row class="list-header">
                            <a-col :span="14" class="left">
                                Муниципалитет
                            </a-col>
                            <a-col :span="5" >
                                ПГПЖ
                            </a-col>
                            <a-col :span="5" >
                                В сравнение
                            </a-col>
                        </a-row>

                        <a-divider class="divider-less-margins" />

                        <div class="scroll-container">
                            <a-row v-for="Munic in SelectedRegionMunicsPGPJ" :key="Munic.ID_Munic" class="list-row" type="flex" align="middle">
                                <a-col :span="14" class="left">
                                    <a @click="MunicClick(Munic.ID_Munic)"> {{ Munic.Name_Munic }} </a>
                                </a-col>
                                <a-col :span="5" >
                                    {{ Munic.PGPJ }}
                                </a-col>
                                <a-col :span="5" >
                                    <a-button v-if="Status=='ready'" type="dashed" shape="circle" icon="plus" @click="CompareMunicButtonClick(Munic.ID_Munic)" />
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
      </a-tabs>

      <div>
        <h2>{{ SelectedRegion.name }}</h2>
        <a-button v-if="Status=='ready'" type="primary" @click="CompareButtonClick">Добавить в сравнение</a-button>
        <!--<a-button v-if="Status=='ready'" type="default" @click="changeTab(2)">Муниципалитеты</a-button>-->
      </div>


  </div>
</template>

<script>
import RadioSvgMap from "./vue-svg-map/radio-svg-map.vue";
import Russia from "../assets/@svg-maps/russia";
import { mapGetters,mapState, mapActions } from "vuex";

export default {
  name: "Map",
  components: {
    RadioSvgMap,
  },
  data() {
    return {
      Russia,
      selectedLocation: null,
      RegionsColorsStyle: "background-image: linear-gradient(90deg, " +
       "rgb(" + this.$store.getters.RegionsColorsFrom.red + "," +
                this.$store.getters.RegionsColorsFrom.green + "," +
                this.$store.getters.RegionsColorsFrom.blue + ") 0%, " +
       "rgb(" + this.$store.getters.RegionsColorsTo.red + "," +
                this.$store.getters.RegionsColorsTo.green + "," +
                this.$store.getters.RegionsColorsTo.blue + ") 100%);",

    };
    //background-image: -webkit-linear-gradient(-90deg, #ff0000 0%, #ff0000 100%);
  },
  computed: {
    /*SelectedRegionIDString: function() {
        if(this.$store.getters.SelectedRegion) {
            return this.$store.getters.SelectedRegion.id.toString()
        }else return null
    },*/
      ...mapGetters(["Status", "SelectedRegion", "SelectedRegionMunicsPGPJ", "HorizontalBarChartSeries"])
  },
  methods: {
    CompareButtonClick(){
        if(this.$store.getters.isCompareMaximum) {
            this.$store.dispatch('CompareButtonClick')
        }else this.openNotificationWithIcon('error','Ошибка','Превышено максимальное кол-во элементов сравнения.')
    },
    CompareMunicButtonClick(municID){
        if(this.$store.getters.isCompareMaximum){
            this.$store.dispatch('CompareMunicButtonClick', municID)
        }else this.openNotificationWithIcon('error','Ошибка','Превышено максимальное кол-во элементов сравнения.')
    },

    MunicClick(municId) {
        this.$store.dispatch('SelectMunic', municId)
    },
    openNotificationWithIcon(type, caption, decription) {
      this.$notification[type]({
        message: caption,
        description: decription,
      });
    },
  }
};
</script>

<style src="./vue-svg-map/vue-svg-map.css"></style>
<style scoped>
    .left {
        text-align: left;
    }



</style>
