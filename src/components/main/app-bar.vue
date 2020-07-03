<template lang='pug'>
	v-app-bar(
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		app
		color="grey lighten-5"
	)
		v-app-bar-nav-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title(
			style="width: 300px"
			class="ml-0 pl-4"
		)
			span( class="hidden-sm-and-down") RS Lang

		v-btn(
			to="/home"
			class="mx-2"
			text large
			active-class="success")
				v-icon( left ) mdi-home-circle
				| Home
		v-btn(
			to="/dictionary"
			class="mx-2"
			text large
			active-class="deep-purple darken-1 white--text")
				v-icon( left ) mdi-book
				| Dictionary
		v-btn(
			to="/about"
			class="mx-2"
			text large
			active-class="primary")
				v-icon( left ) mdi-account-multiple
				| About

		v-spacer
		v-btn( icon)
			v-icon mdi-bell

		v-btn(
			icon
			to="/profile"
			large
		)
			v-icon mdi-account-circle

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'AppBar',
	components: {},
	props: [],
	data: () => ({
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
		...mapMutations({
			editHtml: 'EDIT_HTML',
		}),
	},

};
</script>

<style lang='scss' scoped>

</style>
