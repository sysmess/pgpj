<template>
  <div id="stat-filter">
    <div>
      <a-select
        default-value="Год"
        class="filter-year"
        @change="handleChangeYear"
        :value="Filter.Year"
        size="default"
      >
        <a-select-option v-for="value in Years" :key="value"> {{ value }} </a-select-option>
      </a-select>

      <a-select
        default-value="Регион"
        class="filter-region"
        @change="handleChangeRegion"
        @focus="handleFocusRegion"
        @blur="handleBlurRegion"
        :filter-option="filterOption"
        :value="SelectedRegion.name"
        dropdownMatchSelectWidth
        show-search
        placeholder="Выберите регион"
        option-filter-prop="children"
      >
        <a-select-option v-for="region in Regions" :key="region.ID_Region">
          {{ region.Name_Region }}
        </a-select-option>
      </a-select>

      <a-select
        default-value="Тип поселения"
        class="filter-residentstype"
        @change="handleChangeResidentsType"
        :value="Filter.Settlement"
      >
        <a-select-option
          v-for="residentsType in ResidentsTypes"
          :key="residentsType.id"
        >
          {{ residentsType.name }}
        </a-select-option>
      </a-select>

      <a-select
        default-value="Пол"
        class="filter-sex"
        @change="handleChangeSex"
        :value="Filter.Sex"
      >
        <a-select-option v-for="Gender in Genders" :key="Gender.id">
          {{ Gender.name }}
        </a-select-option>
      </a-select>

      <a-badge :count="CompareCount">
        <router-link to="/compare">
            <a-button type="primary" :disabled="!isCompareActive"> Сравнить </a-button>
        </router-link>
      </a-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "StatFilter",
  methods: {
    handleChangeYear(value) {
        this.$store.dispatch('ChangeFilterYear', value)
        //console.log(`filter year: ${value}`);
    },
    handleChangeRegion(value) {
        this.$store.dispatch('ChangeFilterRegion', value)
        this.$store.dispatch('SelectRegion', value)
        //console.log(`filter region: ${value}`);
    },
    handleBlurRegion() {
      //console.log('region blur');
    },
    handleFocusRegion() {
      //console.log('region focus');
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeResidentsType(value) {
        this.$store.dispatch('ChangeFilterResidentsType', value)
        //console.log(`filter residents type: ${value}`);
    },
    handleChangeSex(value) {
        this.$store.dispatch('ChangeFilterSex', value)
        //console.log(`filter sex: ${value}`);
    },
  },
  computed: {
    SelectedRegionName: function() {
        if(this.$store.getters.SelectedRegion) { return this.$store.getters.SelectedRegion.name }
        else {return 'None'}
    },
    ...mapGetters(["Status", "Years", "SelectedRegion", "Regions", "RegionsCount", "ResidentsTypes", "Genders", "Filter", "CompareCount", "isCompareActive"])
  },
};
</script>

<style scoped>
#stat-filter {
  line-height: 40px;
}
.ant-select {
  margin-left: 4px;
  margin-right: 4px;
}
.ant-btn {
  margin-left: 4px;
}
</style>
