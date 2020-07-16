import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/main/Main.vue';
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
	next('/home');
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
				component: () => import(/* webpackChunkName: "home" */ '../views/main/Home.vue'),
				name: 'Home',
				meta: {
					breadcrumb: [
						{ text: 'Home' },
					],
				},
			},
			{
				path: '/profile',
				component: () => import(/* webpackChunkName: "profile" */ '../views/main/Profile.vue'),
				name: 'Profile',
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Profile' },
					],
				},
			},
			{
				path: '/AudioVizov',
				component: () => import(/* webpackChunkName: "gameaudiovizov" */ '../components/GameAudioVizov.vue'),
				name: 'Game AudioVizov',
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Game AudioVizov' },
					],
				},
			},
			{
				path: '/english-puzzle',
				name: 'English-puzzle',
				component: () => import(/* webpackChunkName: "english-puzzle" */ '../components/english-puzzle.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'English Puzzle' },
					],
				},
			},
			{
				path: '/speakit',
				name: 'Speakit',
				component: () => import(/* webpackChunkName: "speakit" */ '../components/GameSpeakit.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Speakit' },
					],
				},
			},
			{
				path: '/speaking',
				name: 'Speaking',
				component: () => import(/* webpackChunkName: "speaking" */ '../components/GameSpeaking.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Speaking' },
					],
				},
			},
			{
				path: '/dictionary',
				name: 'Dictionary',
				component: () => import(/* webpackChunkName: "dictionary" */ '../views/main/Dictionary.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Dictionary' },
					],
				},
			},
			{
				path: '/sprint',
				name: 'Sprint',
				component: () => import(/* webpackChunkName: "sprint" */ '../components/GameSprint.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Sprint' },
					],
				},
			},
			{
				path: '/statistics',
				name: 'Statistics',
				component: () => import(/* webpackChunkName: "statistics" */ '../views/main/Statistics.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Statistics' },
					],
				},
			},
			{
				path: '/about',
				name: 'About',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/main/About.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'About' },
					],
				},
			},
			{
				path: '/main-game',
				name: 'Main game',
				component: () => import(/* webpackChunkName: 'main-game' */ '../components/mainGame/GameMain.vue'),
				meta: {
					breadcrumb: [
						{ text: 'Home', to: '/home' },
						{ text: 'Main game' },
					],
				},
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
		path: '*',
		name: 'Other',
		redirect: '/home',
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
