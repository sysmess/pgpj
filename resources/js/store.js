import Vue from "vue";
import Vuex from "vuex";
import numeral from "numeral";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Status: 'waiting',
    Error: null,
    Classes: [
        {N_class: 0, Class: 'all', Class_str: 'Все причины'},
        {N_class: 1, Class: 'I', Class_str: 'Инфекционные и паразитарные болезни'},
        {N_class: 2, Class: 'II', Class_str: 'Новообразования'},
        {N_class: 3, Class: 'III', Class_str: 'Болезни крови, кроветворных органов и отдельные нарушения, вовлекающие иммунный механизм'},
        {N_class: 4, Class: 'IV', Class_str: 'Болезни эндокринной системы, расстройства питания и нарушения обмена веществ'},
        {N_class: 5, Class: 'V', Class_str: 'Психические расстройства и расстройства поведения'},
        {N_class: 6, Class: 'VI', Class_str: 'Болезни нервной системы'},
        {N_class: 7, Class: 'VII', Class_str: 'Болезни глаза и его придаточного аппарата'},
        {N_class: 8, Class: 'VIII', Class_str: 'Болезни уха и сосцевидного отростка'},
        {N_class: 9, Class: 'IX', Class_str: 'Болезни системы кровообращения'},
        {N_class: 10, Class: 'X', Class_str: 'Болезни органов дыхания'},
        {N_class: 11, Class: 'XI', Class_str: 'Болезни органов пищеварения'},
        {N_class: 20, Class: 'XX', Class_str: 'Внешние причины'},
        {N_class: 100, Class: 'others', Class_str: 'Другие причины'},
    ],
    SelectedRegion: { id: null, name: 'Выберите регион', haveMunic: false },
    SelectedRegionData: undefined,
    SelectedRegionDataFiltered: undefined,
    SelectedRegionMunics: undefined,
    SelectedRegionMunicsPGPJ: undefined,
    SelectedRegionMunicsData: undefined,
    SelectedMunic: undefined,
    SelectedMunicDataFiltered: undefined,
    //SelectedRegionMunicsDataFiltered: undefined,
    RussiaData: undefined,
    RussiaDataFiltered: undefined,
    HorizontalBarChartSeries: undefined,
    LineChartSeries: undefined,
    Regions: [{ ID_Region: 0, Name_Region: "Россия" }],
    RegionsData: [{ ID_Region: 0, Name_Region: "Россия", Year: 2019, Settlement: "T", Sex: "B", N_class: 0, Class: "all", Class_str: "Все причины", PGPJ: 0}],
    Munics: [{ ID_Region: 0, ID_Munic: 8060100000, Name_Munic: "Абзелиловский муниципальный район"}],
    MunicsData: [{ ID_Region: 2, Name_Region: "Республика Башкортостан", ID_Munic: 8060100000, Name_Munic: "Абзелиловский муниципальный район", Year: 2015, Settlement: "R", Sex: "B", N_class: 0, Class: "all", Class_str: "Все причины", PGPJ: 26282}],
    RegionsHaveMunic: [],
    Filter: { ID_Region: 0, Year: 2019, Settlement: "T", Sex: "B" },
    OpjData: undefined,
    PopulationData: undefined,
    ResidentsTypes: [
      { id: "R", name: "Сельское население" },
      { id: "T", name: "Все население" },
      { id: "U", name: "Городское население" },
    ],
    Genders: [
      { id: "B", name: "Оба пола" },
      { id: "F", name: "Женщины" },
      { id: "M", name: "Мужчины" },
    ],
    Years: [2015,2016,2017,2018,2019],
    RegionsColorsSelection: { red: 230, green: 70, blue: 10 },
    RegionsColorsFrom: { red: 105, green: 215, blue: 255 }, //lighter
    RegionsColorsTo: { red: 0, green: 50, blue: 160 }, //darker
    RegionsColors: undefined,
    PGPJMin: 0,
    PGPJMax: 0,
    Compare: [{type: 'region', name: 'Россия', id: 0}],
    CompareMaximum: 5,
    CompareHorizontalBarChartSeries: undefined,
    CompareData: undefined,
    CompareDataFiltered: undefined,
    navHeight: 0,
    BarsColors: ['#0096ff', '#e00404', '#13d8aa', '#ff9d09', '#69d2e7', '#2b908f', '#90ee7e'],
  },
  mutations: {
    SetInitialData (state) {

        //RussiaData
        state.RussiaData = state.RegionsData.filter( rd => rd.ID_Region == 0 )

        //MaxPGPJ
        state.PGPJMax = Math.max.apply(null, state.RegionsData.map(item => {
            item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
            return item.PGPJ
        }))


        //Regions Colors
        let colorsPercents = state.RegionsData
                .filter(rd => rd.N_class == 0)
                .filter(rd => rd.Year == state.Years[state.Years.length - 1])
                .filter(rd => rd.Settlement == 'T')
                .filter(rd => rd.Sex == 'B')
                .map(item => {
                    item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                    return item
                })
                .map(item => {
                    let percent =  Math.trunc(parseFloat(item.PGPJ / state.PGPJMax * 255))
                    return {id: item.ID_Region, percent: percent}
                })

        state.RegionsColors = colorsPercents.map(item =>{
            let rColor = {
                red: Math.trunc(parseFloat(state.RegionsColorsFrom.red + (state.RegionsColorsTo.red - state.RegionsColorsFrom.red) * item.percent / 100)),
                green: Math.trunc(parseFloat(state.RegionsColorsFrom.green + (state.RegionsColorsTo.green - state.RegionsColorsFrom.green) * item.percent / 100)),
                blue: Math.trunc(parseFloat(state.RegionsColorsFrom.blue + (state.RegionsColorsTo.blue - state.RegionsColorsFrom.blue) * item.percent / 100)),
            }
            return {id: item.id, color: {red: rColor.red, green: rColor.green, blue: rColor.blue}}
        })

        //RussiaDataFiltered
        let regionData = state.RegionsData
            .filter(rd => rd.ID_Region == 0)
            .filter(rd => rd.Year == state.Filter.Year)
            .filter(rd => rd.Settlement == state.Filter.Settlement)
            .filter(rd => rd.Sex == state.Filter.Sex)
            .sort((a,b) => a.N_class - b.N_class) //сортировка по N_class
            .map(item => {
                item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                return item
            })

        //Проверяем, если не хватает данных добавляем нули

        let classes = state.Classes
        let srdf = classes.map(item => {
            let rdf = regionData.find(fitem => fitem.N_class==item.N_class)
            if(rdf) { return rdf }else {
                item.ID_Region =  0
                item.Name_Region = 'Россия'
                item.Year = state.Filter.Year
                item.Settlement = state.Filter.Settlement
                item.Sex = state.Filter.Sex
                item.PGPJ = 0
                return item
            }
        })
        state.RussiaDataFiltered = srdf

        //Munic
        state.RegionsHaveMunic = Array.from(new Set(state.MunicsData.map(item => item.ID_Region )));



        //HorizontalBarChartSeries
        let rhbcs = state.RussiaDataFiltered.map(item => item.PGPJ)

        state.HorizontalBarChartSeries = [
            { name: "Россия", data: rhbcs }
        ]


        //LineChartSeries
        if(state.SelectedRegion.id == null) {
          let rlcs = state.RegionsData
              .filter(rd => rd.N_class == 0)
              .filter(rd => rd.ID_Region == 0)
              .filter(rd => rd.Settlement == state.Filter.Settlement)
              .filter(rd => rd.Sex == state.Filter.Sex)
              .sort((a, b) => a.Year - b.Year) //сортировка по Year
              .map(item => {
                  item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                  return item
              })
              .map(item => item.PGPJ)

          state.LineChartSeries = [ {name: "Россия", data: rlcs} ]
        }


    },

    ChangeFilterYear(state, payload) {
        state.Filter.Year = payload
    },
    ChangeFilterRegion(state, payload) {
        state.Filter.ID_Region = payload
    },
    ChangeFilterResidentsType(state, payload) {
        state.Filter.Settlement = payload
    },
    ChangeFilterSex(state, payload) {
        state.Filter.Sex = payload
    },

    SelectRegion(state, payload) {
      state.SelectedRegion = {
        id: payload,
        name: state.Regions.find(region => region.ID_Region == payload).Name_Region,
        haveMunic: false
      }
      if(state.RegionsHaveMunic.find(fitem => fitem == payload)) {
          state.SelectedRegion.haveMunic = true
      }else {
          state.SelectedRegion.haveMunic = false
      }

      //Change Filter
      state.Filter.ID_Region = payload

      //Update selected munic
      state.SelectedMunic = undefined
      state.SelectedMunicDataFiltered = undefined
    },

    SelectMunic(state, payload) {
      state.SelectedMunic = {
        id: payload,
        name: state.Munics.find(munic => munic.ID_Munic == payload).Name_Munic,
        parentRegion: state.SelectedRegion.id
      }

    },

    Update(state) {
      //Change RussiaDataFiltered
      let RussiaData = state.RegionsData
            .filter(rd => rd.ID_Region == 0)
            .filter(rd => rd.Year == state.Filter.Year)
            .filter(rd => rd.Settlement == state.Filter.Settlement)
            .filter(rd => rd.Sex == state.Filter.Sex)
            .sort((a,b) => a.N_class - b.N_class) //сортировка по N_class
            .map(item => {
            item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
            return item
            })

      //Проверяем, если не хватает данных добавляем нули
      let rclasses = state.Classes
      let rrdf = rclasses.map(item => {
          let rdf = RussiaData.find(fitem => fitem.N_class==item.N_class)
          if(rdf) {
              return rdf
          }else {
              item.ID_Region =  0
              item.Year = state.Filter.Year
              item.Settlement = state.Filter.Settlement
              item.Sex = state.Filter.Sex
              item.Name_Region = state.SelectedRegion.name
              item.PGPJ = 0
              return item
          }
      })
      state.RussiaDataFiltered = rrdf



      //Change SelectedRegionData
      state.SelectedRegionData = state.RegionsData.filter(
        rd => rd.ID_Region == state.SelectedRegion.id
        )

      //Change SelectedRegionDataFiltered
      let regionData = state.RegionsData
            .filter(rd => rd.ID_Region == state.Filter.ID_Region)
            .filter(rd => rd.Year == state.Filter.Year)
            .filter(rd => rd.Settlement == state.Filter.Settlement)
            .filter(rd => rd.Sex == state.Filter.Sex)
            .sort((a,b) => a.N_class - b.N_class) //сортировка по N_class
            .map(item => {
            item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
            return item
            })

      //Проверяем, если не хватает данных добавляем нули
      let classes = state.Classes
      let srdf = classes.map(item => {
          let rdf = regionData.find(fitem => fitem.N_class==item.N_class)
          if(rdf) {
              return rdf
          }else {
              item.ID_Region =  state.Filter.ID_Region
              item.Year = state.Filter.Year
              item.Settlement = state.Filter.Settlement
              item.Sex = state.Filter.Sex
              item.Name_Region = state.SelectedRegion.name
              item.PGPJ = 0
              return item
          }
      })
      state.SelectedRegionDataFiltered = srdf


      //Change SelectedMunicDataFiltered
      if(state.SelectedMunic) {
          let municData = state.MunicsData
              .filter(rd => rd.ID_Munic == state.SelectedMunic.id)
              .filter(rd => rd.ID_Region == state.Filter.ID_Region)
              .filter(rd => rd.Year == state.Filter.Year)
              .filter(rd => rd.Settlement == state.Filter.Settlement)
              .filter(rd => rd.Sex == state.Filter.Sex)
              .sort((a, b) => a.N_class - b.N_class) //сортировка по N_class
              .map(item => {
                  item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                  return item
              })

          //Проверяем, если не хватает данных добавляем нули
          let mclasses = state.Classes
          let smdf = mclasses.map(item => {
              let mdf = municData.find(fitem => fitem.N_class == item.N_class)
              if (mdf) {
                  return mdf
              } else {
                  item.ID_Region = state.Filter.ID_Region
                  item.ID_Munic = state.SelectedMunic.id
                  item.Year = state.Filter.Year
                  item.Settlement = state.Filter.Settlement
                  item.Sex = state.Filter.Sex
                  item.Name_Region = state.SelectedRegion.name
                  item.PGPJ = 0
                  return item
              }
          })
          state.SelectedMunicDataFiltered = smdf
      }


      //HorizontalBarChartSeries
      let rhbcs = state.RussiaDataFiltered.map(item => item.PGPJ)

      state.HorizontalBarChartSeries = []
      state.HorizontalBarChartSeries.push({ name: "Россия", data: rhbcs })

      if(state.SelectedRegion.id != null){
        let srhbcs = state.SelectedRegionDataFiltered.map(item => item.PGPJ)
        state.HorizontalBarChartSeries.push({ name: state.SelectedRegion.name, data: srhbcs })
      }
      if(state.SelectedMunic){
        let smhbcs = state.SelectedMunicDataFiltered.map(item => item.PGPJ)
        state.HorizontalBarChartSeries.push({ name: state.SelectedMunic.name, data: smhbcs })
      }



      //LineChartSeries
      if(state.SelectedMunic)
      {
          let mlcs = state.MunicsData
              .filter(rd => rd.N_class == 0)
              .filter(rd => rd.ID_Munic == state.SelectedMunic.id)
              .filter(rd => rd.ID_Region == state.SelectedRegion.id)
              .filter(rd => rd.Settlement == state.Filter.Settlement)
              .filter(rd => rd.Sex == state.Filter.Sex)
              .sort((a, b) => a.Year - b.Year) //сортировка по Year
              .map(item => {
                  item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                  return item
              })
              .map(item => item.PGPJ)

          state.LineChartSeries = [
              {name: "Муниципалитет", data: mlcs},
          ]
      }else if(state.SelectedRegion.id == null) {
          let rlcs = state.RegionsData
              .filter(rd => rd.N_class == 0)
              .filter(rd => rd.ID_Region == 0)
              .filter(rd => rd.Settlement == state.Filter.Settlement)
              .filter(rd => rd.Sex == state.Filter.Sex)
              .sort((a, b) => a.Year - b.Year) //сортировка по Year
              .map(item => {
                  item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                  return item
              })
              .map(item => item.PGPJ)

          state.LineChartSeries = [
              {name: "Россия", data: rlcs},
          ]
      }else {
          let rlcs = state.RegionsData
              .filter(rd => rd.N_class == 0)
              .filter(rd => rd.ID_Region == state.SelectedRegion.id)
              .filter(rd => rd.Settlement == state.Filter.Settlement)
              .filter(rd => rd.Sex == state.Filter.Sex)
              .sort((a, b) => a.Year - b.Year) //сортировка по Year
              .map(item => {
                  item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                  return item
              })
              .map(item => item.PGPJ)

          state.LineChartSeries = [
              {name: "Регион", data: rlcs},
          ]
      }



        // Munics /////////////////////////
        ///////////////////////////////////
        state.SelectedRegionMunics = state.Munics
            .filter(munic => munic.ID_Region == state.SelectedRegion.id)

        state.SelectedRegionMunicsData = state.MunicsData
            .filter(rd => rd.ID_Region == state.SelectedRegion.id)

        /*
        state.SelectedRegionMunicsDataFiltered = state.SelectedRegionMunicsData
                                                    .filter(rd => rd.ID_Region == state.SelectedRegion.id)
                                                    .filter(rd => rd.Year == state.Filter.Year)
                                                    .filter(rd => rd.Settlement == state.Filter.Settlement)
                                                    .filter(rd => rd.Sex == state.Filter.Sex)
        */

        state.SelectedRegionMunicsPGPJ = state.SelectedRegionMunics
            .map(item => {
                let munic = state.SelectedRegionMunicsData
                                 .find(fitem => fitem.ID_Munic==item.ID_Munic &&
                                                fitem.N_class==0 &&
                                                fitem.Year == state.Filter.Year &&
                                                fitem.Settlement == state.Filter.Settlement &&
                                                fitem.Sex == state.Filter.Sex
                                                )
                if(munic) {
                    item.PGPJ = Math.trunc(parseFloat(munic.PGPJ))
                }else item.PGPJ = 0
            return item
            })



      // Compare //////////////////////////////
      /////////////////////////////////////////
      state.CompareData = state.RegionsData.filter(rd => {
        return state.Compare.map(item => item.type == 'region' && Number(item.id)).includes(rd.ID_Region)
      })

      let cmd = state.MunicsData.filter(md => {
        return state.Compare.map(item =>  item.type == 'munic' && Number(item.id)).includes(md.ID_Munic)
      })
      state.CompareData.push(...cmd)


      //Change CompareRegionsDataFiltered
      let compareDatas = state.CompareData
            .filter(rd => rd.Year == state.Filter.Year)
            .filter(rd => rd.Settlement == state.Filter.Settlement)
            .filter(rd => rd.Sex == state.Filter.Sex)
            .sort((a,b) => a.N_class - b.N_class) //сортировка по N_class
            .map(item => {
                item.PGPJ = Math.trunc(parseFloat(item.PGPJ)) //округляем ПГПЖ
                return item
            })
      state.CompareDataFiltered = compareDatas


      //Проверяем, если не хватает данных добавляем нули
      let compareDatasFiltered = []
      state.Compare.forEach(citem =>{
        if(citem.type == 'region'){
              let compareRegionData = compareDatas.filter(item => Number(item.ID_Region) == Number(citem.id))
              let cclasses = state.Classes
              let csrdf = cclasses.map(item => {
                  let rdf = compareRegionData.find(fitem => Number(fitem.N_class) == Number(item.N_class))
                  if(rdf) { return rdf
                  }else {
                      return item = {
                        ID_Region: citem.id,
                        Name_Region: citem.name,
                        Year: state.Filter.Year,
                        Settlement: state.Filter.Settlement,
                        Sex: state.Filter.Sex,
                        N_class: item.N_class,
                        Class: item.Class,
                        Class_str: item.Class_str,
                        PGPJ: 0
                      }
                  }
              })
              compareDatasFiltered.push(...csrdf)
        }
        if(citem.type == 'munic'){
              let compareMunicData = compareDatas.filter(item => Number(item.ID_Munic) == Number(citem.id))
              let cclasses = state.Classes
              let csrdf = cclasses.map(item => {
                  let rdf = compareMunicData.find(fitem => Number(fitem.N_class) == Number(item.N_class))
                  if(rdf) { return rdf
                  }else {
                      return item = {
                        ID_Region: state.Munics.find(m => m.ID_Munic ==citem.id).ID_Region,
                        ID_Munic: citem.id,
                        Name_Munic: citem.name,
                        Year: state.Filter.Year,
                        Settlement: state.Filter.Settlement,
                        Sex: state.Filter.Sex,
                        N_class: item.N_class,
                        Class: item.Class,
                        Class_str: item.Class_str,
                        PGPJ: 0
                      }
                  }
              })
              compareDatasFiltered.push(...csrdf)
        }
      })
      state.CompareDataFiltered = compareDatasFiltered


      //CompareHorizontalBarChartSeries
      state.CompareHorizontalBarChartSeries = []
      state.Compare.forEach(item => {
        if(item.type == 'region') {
            let crhbcs = state.CompareDataFiltered.filter(fitem => fitem.ID_Region == item.id)
                .map(item => item.PGPJ)
            state.CompareHorizontalBarChartSeries.push({name: item.name, data: crhbcs})
        }
        if(item.type == 'munic') {
            let crhbcs = state.CompareDataFiltered.filter(fitem => fitem.ID_Munic == item.id)
                .map(item => item.PGPJ)
            state.CompareHorizontalBarChartSeries.push({name: item.name, data: crhbcs})
        }
      })

    },



    LoadRegions(state, regions) {
        state.Regions = regions
    },
    LoadRegionsData(state, regionsData) {
        state.RegionsData = regionsData
    },
    LoadMunics(state, munics) {
        state.Munics = munics
    },
    LoadMunicsData(state, municsData) {
        state.MunicsData = municsData
    },
    LoadOpj(state, opjData) {
        state.OpjData = opjData
    },
    LoadPopulation(state, populationData) {
        state.PopulationData = populationData
    },
    updateStatus(state, status) {
      state.Status = status
    },
    CompareButtonClick(state)
    {
        //Compare
        if(state.SelectedRegion) {
            let newCompareEntry = {type: 'region', name: state.SelectedRegion.name, id: state.SelectedRegion.id}
            if (!state.Compare.map(item => item.id).includes(newCompareEntry.id)) {
                state.Compare.push(newCompareEntry)
            }
        }
    },
    CompareDeleteButtonClick(state,index)
    {
        state.Compare.splice(index,1)
    },
    CompareMunicButtonClick(state, municID)
    {
        //Compare
        let munic = state.Munics.find(f => f.ID_Munic == municID)
        let newCompareEntry = {type: 'munic', name: munic.Name_Munic, id: munic.ID_Munic}
        if (!state.Compare.map(item => item.id).includes(newCompareEntry.id)) {
            state.Compare.push(newCompareEntry)
        }

    }
  },


  /////////  Actions  ////////
  actions: {
    ChangeFilterYear({ commit }, payload) {
        commit("ChangeFilterYear", payload)
        commit("Update")
    },
    ChangeFilterRegion({ commit }, payload) {
        commit("ChangeFilterRegion", payload)
        commit("Update")
    },
    ChangeFilterResidentsType({ commit }, payload) {
        commit("ChangeFilterResidentsType", payload)
        commit("Update")
    },
    ChangeFilterSex({ commit }, payload) {
        commit("ChangeFilterSex", payload)
        commit("Update")
    },

    CompareButtonClick({ commit })
    {
        commit("CompareButtonClick")
        commit("Update")
    },

    CompareDeleteButtonClick({ commit }, payload)
    {
        commit("CompareDeleteButtonClick", payload)
        commit("Update")
    },

    CompareMunicButtonClick({ commit }, municID)
    {
        commit("CompareMunicButtonClick", municID)
        commit("Update")
    },

    SelectRegion({ commit }, payload) {
        commit("SelectRegion", payload)
        commit("Update")
    },

    SelectMunic({ commit }, payload) {
        commit("SelectMunic", payload)
        commit("Update")
    },

    async LoadRegionsData({ commit, getters }){
        console.log('Load regions Data..')

        try {
            await axios.get('/api/regions')
            .then((response) => {
                commit('LoadRegions', response.data);
            })

            await axios.get('/api/munic')
            .then((response) => {
                commit('LoadMunics', response.data);
            })

            await axios.get('/api/municdata')
            .then((response) => {
                commit('LoadMunicsData', response.data);
            })

            await axios.get('/api/opj2019')
            .then((response) => {
                commit('LoadOpj', response.data);
            })

            await axios.get('/api/population')
            .then((response) => {
                commit('LoadPopulation', response.data);
            })

            await axios.get('/api/regionsdata')
            .then((response) => {
                commit('LoadRegionsData', response.data)
                commit('SetInitialData')
                commit('updateStatus', 'ready')
            })
        }catch(e) { console.log(e); commit('updateStatus', 'error');}

    },
  },


  getters: {
    SelectedRegion(state) {
      return state.SelectedRegion
    },
    SelectedRegionData(state) {
      return state.SelectedRegionData
    },
    Regions(state) {
      return state.Regions
    },
    RegionsData(state) {
      return state.RegionsData
    },
    MunicsData(state) {
      return state.MunicsData
    },
    RegionsCount(state) {
      return state.Regions.length
    },
    Classes(state){
      return state.Classes
    },
    ClassesCount(state){
      return state.Classes.length
    },
    Years(state) {
      return state.Years
    },
    Genders(state) {
      return state.Genders
    },
    ResidentsTypes(state) {
      return state.ResidentsTypes
    },
    Status(state) {
      return state.Status
    },
    SelectedRegionDataFiltered(state){
        return state.SelectedRegionDataFiltered
    },
    SelectedMunic(state){
        return state.SelectedMunic
    },
    SelectedMunicDataFiltered(state){
        return state.SelectedMunicDataFiltered
    },
    RussiaDataFiltered(state){
        return state.RussiaDataFiltered
    },
    HorizontalBarChartSeries(state){
        return state.HorizontalBarChartSeries
    },
    LineChartSeries(state){
        return state.LineChartSeries
    },
    Filter(state){
        return state.Filter
    },
    RegionsColors(state) {
        return state.RegionsColors
    },
    RegionsColorsFrom(state) {
        return state.RegionsColorsFrom
    },
    RegionsColorsTo(state) {
        return state.RegionsColorsTo
    },
    RegionsHaveMunic(state) {
        return state.RegionsHaveMunic
    },
    SelectedRegionMunics(state) {
        return state.SelectedRegionMunics
    },
    SelectedRegionMunicsData(state) {
        return state.SelectedRegionMunicsData
    },
    SelectedRegionMunicsPGPJ(state) {
        return state.SelectedRegionMunicsPGPJ
    },
    SelectedRegionMunicsDataFiltered(state) {
        return state.SelectedRegionMunicsDataFiltered
    },
    OpjData(state) {
        return state.OpjData
    },
    PopulationData(state) {
        return state.PopulationData
    },
    Compare(state) {
        return state.Compare
    },
    CompareCount(state) {
        return state.Compare.length-1
    },
    CompareData(state) {
        return state.CompareData
    },
    CompareDataFiltered(state) {
        return state.CompareDataFiltered
    },
    CompareHorizontalBarChartSeries(state) {
        return state.CompareHorizontalBarChartSeries
    },
    isCompareMaximum(state) {
        if(state.Compare.length <= state.CompareMaximum) return true
        else return false
    },
    isCompareActive(state) {
        if(state.Compare.length > 1) return true
        else return false
    },
    navHeight(state) {
        return state.navHeight
    },
    BarsColors(state) {
        return state.BarsColors
    },
  },
  modules: {},
});
