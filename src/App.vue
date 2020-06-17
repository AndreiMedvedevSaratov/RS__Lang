<template lang='pug'>
	v-app
		alert
		transition
			router-view( name='alert' )
			router-view
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import alert from '@/components/alert.vue';

export default {
	name: 'App',

	components: {
		alert,
	},
	computed: {
		...mapGetters(['isAuthenticated']),
	},

	data: () => ({
		//
	}),
	mounted() {
	},
	methods: {
		...mapActions({
			logout: 'AUTH_LOGOUT',
		}),
	},
};
</script>
