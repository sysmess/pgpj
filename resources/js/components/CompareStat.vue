<template>
<a-spin v-if="Status=='ready'" :spinning="false">
    <div id="compareStat" class="container">
        <div v-if="CompareData">
            <a-row class="header-row" type="flex" align="middle">
                <a-col flex="200px" class="className">Класс</a-col>
                <a-col flex="auto" v-for="(Item, index) in Compare" :key="Item.id" >
                    <a-popover v-if="Item.type == 'region'" title="Регион" placement="bottom" >
                        <template slot="content">
                          <p>{{ Item.name }}</p>
                          <a-button v-if="Status=='ready' && index != 0" type="primary" @click="CompareDeleteButtonClick(index)">Удалить</a-button>
                        </template>
                        <a-button type="primary" size="small" :style=" 'background-color:' + BarsColors[index] +';'" class="header-rect"/>
                    </a-popover>

                    <a-popover v-if="Item.type == 'munic'" title="Муниципалитет" placement="bottom">
                        <template slot="content">
                          <p>{{ Item.name }}</p>
                          <a-button v-if="Status=='ready' && index != 0" type="primary" @click="CompareDeleteButtonClick(index)">Удалить</a-button>
                        </template>
                        <a-button type="primary" size="small" :style=" 'background-color:' + BarsColors[index] +';'" class="header-rect"/>
                    </a-popover>
                </a-col>
            </a-row>

            <a-row v-for="Class in Classes" :key="Class.N_class" class="list-row" type="flex" align="middle">
                <a-col flex="200px" class="className">
                    {{ Class.Class_str }}
                </a-col>
                <a-col v-for="(Item, index) in Compare" :key="Item.id" flex="auto" >
                    <span v-if="Item.type=='region'" class="pgpj">{{ numeral(CompareDataFiltered.find(f=> f.ID_Region==Item.id && f.N_class==Class.N_class).PGPJ).format() }} <br></span>
                    <span v-if="Item.type=='region' && CompareDataFiltered.find(f=> f.ID_Region==Item.id && f.N_class==Class.N_class).PGPJ > 0" class="percent">{{ numeral((CompareDataFiltered.find(f=> f.ID_Region==Item.id && f.N_class==Class.N_class).PGPJ) / (CompareDataFiltered.find(f=> f.ID_Region==Item.id && f.N_class==0).PGPJ)).format('0.00%') }}</span>
                    <span v-if="Item.type=='region' && CompareDataFiltered.find(f=> f.ID_Region==Item.id && f.N_class==Class.N_class).PGPJ <= 0" class="percent"> 0.00% </span>

                    <span v-if="Item.type=='munic'" class="pgpj">{{ numeral(CompareDataFiltered.find(f=> f.ID_Munic==Item.id && f.N_class==Class.N_class).PGPJ).format() }} <br></span>
                    <span v-if="Item.type=='munic' && CompareDataFiltered.find(f=> f.ID_Munic==Item.id && f.N_class==Class.N_class).PGPJ > 0" class="percent">{{ numeral((CompareDataFiltered.find(f=> f.ID_Munic==Item.id && f.N_class==Class.N_class).PGPJ) / (CompareDataFiltered.find(f=> f.ID_Munic==Item.id && f.N_class==0).PGPJ)).format('0.00%') }}</span>
                    <span v-if="Item.type=='munic' && CompareDataFiltered.find(f=> f.ID_Munic==Item.id && f.N_class==Class.N_class).PGPJ <= 0" class="percent"> 0.00% </span>
                </a-col>
            </a-row>
        </div>
        <div v-else>
            <a-empty />
        </div>

    </div>
</a-spin>
<a-spin v-else :spinning="true"></a-spin>
</template>

<script>
import { mapGetters } from "vuex";
import numeral from 'numeral';

export default {
  data() {
    return {
        numeral: numeral
    }
  },
  computed: mapGetters(['Status', 'Classes', 'ClassesCount', 'Compare', 'CompareCount', 'CompareData', 'CompareDataFiltered','RussiaDataFiltered', 'BarsColors']),
  methods: {
     CompareDeleteButtonClick(index){
        if(1==1) {
            this.$store.dispatch('CompareDeleteButtonClick', index)
        }else this.openNotificationWithIcon('error','Ошибка','Превышено максимальное кол-во элементов сравнения.')
    },
  }
};
</script>

<style scoped>
  .center {
    text-align: center;
  }
  .className {
    width: 200px;
    height: auto;
    text-align: left;
  }

  #compareStat {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
  }
  .header-row {
    font-weight: 600;
    color: #777;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .header-rect {
    border: none;
    border-radius: 2px;
    width: 12px!important;
    height: 12px!important;;
  }

  .list-row {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .list-row:nth-child(even) {
    background: #f7f7f7;
  }

  .pgpj {
    color: #777;
    font-weight: 600;
    }
  .percent { color: #999; }
</style>
