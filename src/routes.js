import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ShowList from "@/components/ShowList.vue";
import Home from "@/components/Home.vue";
import VueRouter from "vue-router";
import { auth} from './firebase_config'
import ShowProvince from "@/components/ShowProvince.vue";
const routes = [
    {path: '/',component:Home,meta: {requiresAuth: true} },
    {path:'/login',component:Login},
    {path: '/register',component: Register},
    {path: '/province',component: ShowProvince,meta: {requiresAuth: true}},
    {path: '/questions',component:ShowList,meta: {requiresAuth: true}}
]


const router = new VueRouter({
    routes:routes,
    mode:'history'
})

router.beforeEach((to,from,next) =>{
    auth.onAuthStateChanged(function(user) {
        if (user) {
            let authenticateUser = user
            const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
            console.log('user',requiresAuth)
            if(requiresAuth && ! authenticateUser) {
                next('/login');
            }
            else {
                next();
            }
        } else {
            let authenticateUser
            const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
            if(requiresAuth && ! authenticateUser) {
                next('/login');
            }
            else {
                next();
            }
        }
    });
});

export default router

