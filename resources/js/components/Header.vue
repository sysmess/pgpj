<template>
<div id="header" >
  <a-row type="flex" align="middle" >
    <a-col :xxl="12" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div id="nav">
        <router-link to="/">
            <img id="logo" alt="Inoe logo" :src="require('../assets/logo_inoe.svg').default" />
        </router-link>
        <router-link to="/about">О проекте</router-link> |
        <router-link to="/calculation">Методология расчета</router-link> |
        <router-link to="/download">Скачать</router-link> |
        <router-link to="/upload">Загрузить</router-link> |
        <router-link to="/compare">Сравнить</router-link>
    </div>
    </a-col>

    <a-col :xxl="12" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <StatFilter v-if="Status=='ready'" />
    </a-col>
  </a-row>
</div>
</template>

<script>
import StatFilter from "./StatFilter.vue";
import {mapState} from "vuex";
export default {
  name: "Header",
  components: {
    StatFilter,
  },
  computed: mapState(['Status']),
};
</script>

<style scoped>
#logo {
  width: 80px;
  margin-right: 20px;
  margin-top: 2px;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0096ff;
}
</style>
