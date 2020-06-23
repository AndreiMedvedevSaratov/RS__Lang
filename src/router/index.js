import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
// eslint-disable-next-line import/no-cycle
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
	next('home');
};

const routes = [
	{
		path: '/',
		component: Main,
		name: 'Main',
		redirect: '/home',
		beforeEnter: isAuthenticated,
		children: [
			{
				path: '/home',
				component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
				name: 'Home',
			},
			{
				path: '/profile',
				component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
				name: 'Profile',
			},
			{
				path: '/speakit',
				component: () => import(/* webpackChunkName: "speakit" */ '../components/GameSpeakit.vue'),
				name: 'Game Speakit',
			},
			{
				path: '/about',
				name: 'About',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
			},
		],
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
	{
		path: '/english-puzzle',
		name: 'English-puzzle',
		component: () => import(/* webpackChunkName: "english-puzzle" */ '../components/english-puzzle.vue'),
	},
	{
		path: '/speaking',
		name: 'Speaking',
		component: () => import(/* webpackChunkName: "speaking" */ '../components/speaking.vue'),
	},
	{
		path: '/dictionary',
		name: 'Dictionary',
		component: () => import(/* webpackChunkName: "dictionary" */ '../components/dictionary.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
