import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
	if (store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/login');
};

const isNotAuthenticated = (to, from, next) => {
	if (!store.getters.isAuthenticated) {
		next();
		return;
	}
	next('main');
};

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: 'main',
				components: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
				name: 'Main',
				beforeEnter: isAuthenticated,
			},
			{
				path: 'profile',
				components: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
				name: 'Profile',
				beforeEnter: isAuthenticated,
			},
		],
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
		beforeEnter: isNotAuthenticated,
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
		beforeEnter: isNotAuthenticated,
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
