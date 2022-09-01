import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import vuex from "@/store"
import { home } from "./views/Home"
import { user } from "./views/User"
import { stored } from "./views/Stored"
import { analysis } from './views/Analysis'
import { verify } from './views/Verify'
import { live } from './views/Live'
import { docs } from './views/Docs'

const routes: Array<RouteRecordRaw> = []
const mainPage = ["Live", "Forum", "Predictions", "Results"]

routes.push(home, user, stored, analysis, verify, live, docs)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const status = vuex.getters["User/GetStatus"]
  if (!to.name) next("/Live")
  else if (to?.path.includes("user")) {
    if (!status) next("/")
    else if (!to.name) next("/user/profile")
    else next()
  } else if (to.path.includes("stored")) {
    if (!status) next("/")
    else next()
  } else if (to.path == "/") {
    next("/Live")
  } else if (to.matched[0].path == '/' && !mainPage.includes(to.params.id as string)) {
    next("/Live")
  } else next()

  document.title = `ZBSports ${to.meta.title ? `- ${to.meta.title}` : ''}`
});

export default router
