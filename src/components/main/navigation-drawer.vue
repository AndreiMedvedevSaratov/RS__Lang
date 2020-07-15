<template lang='pug'>
	v-navigation-drawer(
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
			mini-variant
			mobile-breakpoint="md"
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
							:class="item.class"
						)
							v-list-item-action
								v-icon {{ item.icon }}

							v-list-item-content
								v-list-item-title {{ item.text }}
				v-list-item(
						link
						color="warning"
						@click="show = true"
					)
						v-list-item-action
							v-icon mdi-cog

						v-list-item-content
							v-list-item-title Setting
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
			{
				icon: 'mdi-home',
				text: 'HOME',
				class: 'd-flex d-md-none',
				to: '/home',
			},
			{
				icon: 'mdi-library',
				text: 'DICTIONERY',
				class: 'd-flex d-md-none',
				to: '/dictionary',
			},
			{
				icon: 'mdi-clipboard-account',
				text: 'ABOUT',
				class: 'd-flex d-md-none',
				to: '/about',
			},
			{
				icon: 'mdi-history',
				text: 'Statistics',
				class: '',
				to: '/statistics',
			},
		],
	}),
	computed: {
		...mapGetters({
			getHtmlParameters: 'getHtmlParameters',
			getShowSetting: 'showSetting',
		}),
		drawer: {
			get() {
				return this.getHtmlParameters.main.drawer;
			},
			set(value) {
				this.editHtml([{ one: 'main', key: 'drawer', value }]);
			},
		},
		show: {
			get() {
				return this.getShowSetting;
			},
			set() {
				this.setShowSetting();
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
			setShowSetting: 'APP_SHOW_SETTING',
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
