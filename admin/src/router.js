import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import publi from './components/public.vue';
import Login from './pages/Login.vue';
import User from './pages/User.vue';
import Classify from './pages/Classify.vue';
import Article from './pages/Article.vue';
import ArticleCreate from './pages/ArticleCreate.vue';
import ArticleEdit from './pages/ArticleEdit.vue';



Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/publi',
      name: 'publi',
      component: publi,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/User',
      name: 'User',
      component: User,
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify,
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
    },
    {
      path: '/ArticleCreate',
      name: 'ArticleCreate',
      component: ArticleCreate,
    },
    {
      path: '/ArticleEdit:id',
      name: 'ArticleEdit',
      component: ArticleEdit,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
