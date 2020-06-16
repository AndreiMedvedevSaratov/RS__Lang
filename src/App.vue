<template lang='pug'>
	v-app
		transition
			router-view
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'App',

	components: {},
	computed: {
		...mapGetters(['isAuthenticated']),
	},

	data: () => ({
		//
	}),
	mounted() {
		console.info(this.$store);
	},
	methods: {
		...mapActions({
			logout: 'AUTH_LOGOUT',
		}),
	},
};
</script>
