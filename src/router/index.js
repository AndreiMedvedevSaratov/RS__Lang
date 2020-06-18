import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
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
	{
		path: '/audio_vizov',
		name: 'Audiovizov',
		component: () => import(/* webpackChunkName: "audio_vizov */ '../components/audio_vizov.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
