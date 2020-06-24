<template lang='pug'>
	div
		div( class="mx-auto custom text-center" )
			router-link(:to="!isAuthenticated ? '/login':'/home'")
				v-btn( class="mx-2" text large color="primary" ) {{!isAuthenticated ? 'Login':'Home'}}

			router-link(to="/speakit")
				v-btn( class="mx-2" text large color="primary" ) Game Speakit

			router-link(to="/about")
				v-btn( class="mx-2" text large color="primary" ) About

			v-btn(
				class="mx-2"
				text large
				color="warning"
				v-if="isAuthenticated"
				@click="logout"
				) Logout

		router-view
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Main',
	components: {},
	props: [],
	data: () => ({

	}),
	computed: {
		...mapGetters(['isAuthenticated']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapActions({
			logout: 'AUTH_LOGOUT',
		}),
	},

};
</script>
