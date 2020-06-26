<template lang='pug'>
	v-navigation-drawer(
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
			mini-variant
			stateless
			hide-overlay
			expand-on-hover
		)
			v-list( dense)
				template( v-for="item in items")
					router-link( :to="item.to" class="text-decoration-none" )
						v-list-item(
							:key="item.text"
							link
						)
							v-list-item-action
								v-icon {{ item.icon }}

							v-list-item-content
								v-list-item-title {{ item.text }}
				v-list-item(
						link
						color="warning"
						@click="logout"
					)
						v-list-item-action
							v-icon mdi-logout

						v-list-item-content
							v-list-item-title Logout

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'NavigationDrawer',
	components: {},
	props: [],
	data: () => ({
		items: [
			{ icon: 'mdi-history', text: 'Statistics', to: '/statistics' },
			// {
			// 	icon: 'mdi-chevron-up',
			// 	'icon-alt': 'mdi-chevron-down',
			// 	text: 'More',
			// 	model: false,
			// 	children: [
			// 		{ text: 'Import' },
			// 		{ text: 'Export' },
			// 		{ text: 'Print' },
			// 		{ text: 'Undo changes' },
			// 		{ text: 'Other contacts' },
			// 	],
			// },
			{ icon: 'mdi-cog', text: 'Settings', to: '/setting' },
			{ icon: 'mdi-message', text: 'Send feedback', to: '/' },
			{ icon: 'mdi-help-circle', text: 'Help', to: '/' },
		],
	}),
	computed: {
		...mapGetters(['isHtml']),
		drawer: {
			get() {
				return this.isHtml.main.drawer;
			},
			set(value) {
				this.editHtml({ one: 'main', key: 'drawer', value });
			},
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapActions({
			logoutAction: 'AUTH_LOGOUT',
		}),
		...mapMutations({
			editHtml: 'EDIT_HTML',
		}),

		logout() {
			this.logoutAction().then(() => {
				this.$router.push('/login').catch(() => {});
			});
		},
	},

};
</script>

<style lang='scss' scoped>

</style>
