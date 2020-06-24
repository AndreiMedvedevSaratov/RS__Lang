<template lang='pug'>
	div
		div( class="mx-auto custom text-center" )
			router-link(:to="!isAuthenticated ? '/login':'/home'")
				v-btn( class="mx-2" text large color="primary" ) {{!isAuthenticated ? 'Login':'Home'}}

			router-link(to="/speakit")
				v-btn( class="mx-2" text large color="primary" ) Game Speakit

			router-link(to="/profile")
				v-btn( class="mx-2" text large color="primary" ) Profile
			router-link(to="/about")
				v-btn( class="mx-2" text large color="primary" ) About

			router-link(to="/english-puzzle" class="text-decoration-none" )
				v-btn( class="mx-2" x-small outlined  color="success" ) English puzzle
			router-link(to="/speaking" class="text-decoration-none" )
				v-btn( class="mx-2" x-small outlined color="success" ) Speaking
			router-link(to="/dictionary" class="text-decoration-none" )
				v-btn( class="mx-2" x-small outlined color="success" ) Dictionary

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
