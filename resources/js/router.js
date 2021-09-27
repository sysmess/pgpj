import Vue from 'vue';
import VueRouter from "vue-router";

import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Calculation from "./views/Calculation.vue";
import Download from "./views/Download.vue";
import Upload from "./views/Upload.vue";
import Compare from "./views/Compare.vue";
import UserAgreement from "./views/UserAgreement.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/calculation",
    name: "Calculation",
    component: Calculation,
  },
  {
    path: "/download",
    name: "Download",
    component: Download,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/compare",
    name: "Compare",
    component: Compare,
  },
  {
    path: "/agreement",
    name: "Agreement",
    component: UserAgreement,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});



export default router;
