import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/pages/Index';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Reset from './components/pages/Reset';
import Terms from './components/pages/Terms';
import Relationship from './components/pages/Relationship';
import Bookmark from './components/pages/Bookmark';
import RealEstatesForDog from './components/pages/RealEstatesForDog';
import RealEstatesForCat from './components/pages/RealEstatesForCat';
import Result from './components/pages/Result';
import Detail from './components/pages/Detail';
import MyPage from './components/pages/MyPage';
import MyPageEdit from './components/pages/MyPageEdit';
import Contact from './components/pages/Contact';
import BeginnersGuide from './components/pages/BeginnersGuide';
import PageNotFound from './components/pages/PageNotFound';
import CorpLogin from './components/pages/corp/Login';
import CorpRegister from './components/pages/corp/Register';
import CorpIndex from './components/pages/corp/Index';
import ManageProperty from './components/pages/corp/ManageProperty';
import RegisterProperty from './components/pages/corp/RegisterProperty';
import ManageInquiry from './components/pages/corp/ManageInquiry';
import ManageAccountInfo from './components/pages/corp/ManageAccountInfo';
import store from './store';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/reset',
            name: 'reset',
            component: Reset,
        },
        {
            path: '/terms',
            name: 'terms',
            component: Terms,
        },
        {
            path: '/relationship',
            name: 'relationship',
            component: Relationship,
        },
        {
            path: '/bookmark',
            name: 'bookmark',
            component: Bookmark,
            meta: {
                auth: true
            },
        },
        {
            path: '/beginners-guide',
            name: 'beginners-guide',
            component: BeginnersGuide,
        },
        {
            path: '/fordogs',
            name: 'fordogs',
            component: RealEstatesForDog,
        },
        {
            path: '/forcats',
            name: 'forcats',
            component: RealEstatesForCat,
        },
        {
            path: '/result',
            name: 'result',
            component: Result,
        },
        {
            path: '/detail/:detail_id',
            name: 'detail',
            component: Detail,
        },
        {
            path: '/detail/:detail_id/contact',
            name: 'contact',
            component: Contact,
            meta: {
                auth: true
            },
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage,
            meta: {
                auth: true
            },
        },
        {
            path: '/mypage/edit',
            name: 'mypageedit',
            component: MyPageEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/corp/login',
            name: 'corp_login',
            component: CorpLogin,
        },
        {
            path: '/corp/register',
            name: 'corp_register',
            component: CorpRegister,
        },
        {
            path: '/corp/',
            name: 'corp_index',
            component: CorpIndex,
        },
        {
            path: '/corp/manage-property/',
            name: 'manage-property',
            component: ManageProperty,
        },
        {
            path: '/corp/register-property/',
            name: 'register-property',
            component: RegisterProperty,
            meta: {
                corp_auth: true
            },
        },
        {
            path: '/corp/manage-inquiry/',
            name: 'manage-inquiry',
            component: ManageInquiry,
            meta: {
                corp_auth: true
            },
        },
        {
            path: '/corp/manage-account-info/',
            name: 'manage-account-info',
            component: ManageAccountInfo,
            meta: {
                corp_auth: true
            },
        },
        {
            path: '*',
            name: 'page-not-found',
            component: PageNotFound,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
});

router.beforeEach((to, from, next) => {

    const loggedIn = localStorage.user;

    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        store.dispatch('modifySnackText', '会員限定ページです。ログインしてください。');
        store.dispatch('modifySnackColor', 'warning');
        store.dispatch('modifySnackbar', true);
        next({name: 'login', query: { redirect: next }});
    } else {
        next();
    }
});


export default router;
