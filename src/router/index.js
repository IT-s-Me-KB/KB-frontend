import { createRouter, createWebHistory } from 'vue-router';
import UIUX from '@/pages/UIUX.vue';
import Trend from '@/pages/trend/Trend.vue';
import Loading from '@/pages/product/Loading.vue';
import MatchingProducts from '@/pages/product/MatchingProducts.vue';
import ChatBot from '@/pages/business/ChatBot.vue';
import CustomCommunity from '@/pages/customCommunity/CustomCommunity.vue';
import DetailPage from '@/pages/customCommunity/DetailPage.vue';
import UiuxEdit from '@/pages/UiuxEdit.vue';
import MatchingSavings from '@/pages/product/MatchingSavings.vue';
import SavingLoading from '@/pages/product/SavingLoading.vue';
import HomePage from '@/pages/HomePage.vue';
import CustomList from '@/pages/customCommunity/CustomList.vue';
import SearchResult from '@/pages/product/SearchResult.vue';
import StartPage from '@/pages/StartPage.vue';
import GamePage from '@/pages/game/gamepage.vue';
import Pointpage from '@/pages/game/pointpage.vue';
import Quizpage from '@/pages/game/quizpage.vue';
import Walkpage from '@/pages/game/walkpage.vue';
import customerpage from '@/pages/game/customerpage.vue';
import moneytree from '@/pages/game/moneytree.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/start', name: 'StartPage', component: StartPage },
    {
      path: '/trend',
      name: 'trend',
      component: Trend,
      meta: { hideHeader: true },
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult,
      meta: { hideHeader: true },
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
      meta: { hideHeader: true },
    },
    {
      path: '/savingLoading',
      name: 'savingLoading',
      component: SavingLoading,
      meta: { hideHeader: true },
    },
    {
      path: '/matchingProducts',
      name: 'matchingProducts',
      component: MatchingProducts,
      meta: { hideHeader: true },
    },
    {
      path: '/matchingSavings',
      name: 'matchingSavings',
      component: MatchingSavings,
      meta: { hideHeader: true },
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult,
      meta: { hideHeader: true },
    },

    // UI/UX pages
    {
      path: '/uiux',
      name: 'UiUx',
      component: UIUX,
      meta: { hideChatBot: true },
    },
    {
      path: '/uiuxedit',
      name: 'UiuxEdit',
      component: UiuxEdit,
      meta: { hideChatBot: true },
    },

    {
      path: '/chatbot',
      name: 'chatbot',
      component: ChatBot,
    },
    {
      path: '/customCommunity',
      name: 'customCommunity',
      component: CustomCommunity,
      meta: { hideHeader: true },
    },
    {
      path: '/detailPage/:sharedID',
      name: 'detailPage',
      component: DetailPage,
      meta: { hideHeader: true, hideChatBot: true },
    },
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/customList',
      name: 'customList',
      component: CustomList,
      meta: { hideHeader: true },
    },

    {
      path: '/trend',
      name: 'trend',
      component: Trend,
      meta: { hideHeader: true },
    },

    {
      path: '/chatbot',
      name: 'chatbot',
      component: ChatBot,
    },
    {
      path: '/game',
      name: 'GamePage',
      component: GamePage,
    },
    {
      path: '/customer',
      name: 'customerpage',
      component: customerpage,
    },
    {
      path: '/point',
      name: 'pointPage',
      component: Pointpage,
    },
    {
      path: '/quiz',
      name: 'quizPage',
      component: Quizpage,
    },
    {
      path: '/walk',
      name: 'walkPage',
      component: Walkpage,
    },
    {
      path: '/moneytree',
      name: 'moneytreePage',
      component: moneytree,
    },
  ],
});

export default router;
