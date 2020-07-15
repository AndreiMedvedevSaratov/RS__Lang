<template lang='pug'>
	v-app-bar(
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		app
		:color="background"
		:dark="colorWhite"
	)
		v-app-bar-nav-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title(
			style="width: 300px"
			class="ml-0 pl-4"
		)
			span( class="hidden-sm-and-down") RS Lang

		v-btn(
			to="/home"
			class="mx-2 d-none d-md-flex"
			text large
			active-class="success")
				v-icon( left ) mdi-home-circle
				| Home
		v-btn(
			to="/dictionary"
			class="mx-2 d-none d-md-flex"
			text large
			active-class="deep-purple darken-1 white--text")
				v-icon( left ) mdi-book
				| Dictionary
		v-btn(
			to="/about"
			class="mx-2 d-none d-md-flex"
			text large
			active-class="primary")
				v-icon( left ) mdi-account-multiple
				| About

		v-spacer
		v-btn(
			:loading="load.loading"
			:disabled="load.loading"
			:color="load.status"
			class="ma-2 white--text"
			outlined
		) {{ load.message }}
			v-icon( :color="load.status" ) {{ load.icon }}

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
		...mapGetters({
			isHtml: 'getHtmlParameters',
			load: 'getStatusLoadWithIcon',
		}),
		drawer: {
			get() {
				return this.isHtml.main.drawer;
			},
			set(value) {
				this.editHtml([{ one: 'main', key: 'drawer', value }]);
			},
		},
		background() {
			return this.isHtml.app.background;
		},
		colorWhite() {
			return this.isHtml.app.colorWhite;
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
