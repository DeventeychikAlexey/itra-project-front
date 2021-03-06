import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { noFooter: true, isLogout: true }
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { noFooter: true, isLogout: true }
  },
  {
    path: "/user/:id",
    component: () => import("../views/Page.vue")
  },
  {
    path: "/collection/:id",
    component: () => import("../views/Collection.vue")
  },
  {
    path: "/collection/edit/:id",
    component: () => import("../views/CollectionEdit.vue")
  },
  {
    path: "/admin",
    meta: { adminRights: true },
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/Page404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.adminRights) {
    if (store.getters.isAdmin) next();
    else next("/");
  } else {
    if (to.meta.isLogout) store.dispatch("LOGOUT");
    next();
  }
});

export default router;
