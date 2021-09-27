<template>
<a-layout>
  <a-layout-header :class="{sticky:stickyActive}" ref="layout-header" id="layout-header">
    <Header :class="toggleHeaderClass()" />
  </a-layout-header>
  <a-layout-content id="content" :style="headerMargin">
    <a-spin v-if="Status=='waiting'" :spinning="true" size="large"><router-view /></a-spin>
    <a-spin v-else-if="Status=='error'" tip="Error" :spinning="true" size="large"><router-view /></a-spin>
    <a-spin v-else :spinning="false"><router-view /></a-spin>
  </a-layout-content>
  <a-layout-footer>
    <Footer />
  </a-layout-footer>
</a-layout>

</template>

<script>

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapState } from 'vuex';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            stickyActive: false,
            headerMargin: 'margin-top: 75px'
        }
    },
    computed: mapState(['Status']),
    methods: {
        calcNavHeight() {
            //console.log(this.$refs)
        },
        toggleHeaderClass(){
            if(this.active == false){ return 'header' }
            else { return 'header-sticky' }
        }
    },
    async mounted() {
        await this.$store.dispatch('LoadRegionsData')
        this.calcNavHeight()
        window.document.onscroll = () => {
            let navBar = document.getElementById('layout-header');
            if(window.scrollY > navBar.offsetTop){
                this.stickyActive = true;
            } else {
                this.stickyActive = false;
            }
        }
        window.onresize = () => {
            let navBar = document.getElementById('layout-header');
            //console.log(navBar.clientHeight)
            this.headerMargin = 'margin-top: ' + navBar.clientHeight + 'px'
        }

    }


};
</script>

<style src="./styles.css"></style>
<style scoped></style>
