<template lang="pug">
	v-app( id="inspire")

		// Компонент NavigationDrawer
		navigationBrawer

		// Компонент AppBar
		appbar

		v-main(
			:class="background"
		)
			// Хлебные крошки
			v-breadcrumbs(
				v-if="breadcrumbs"
				:items="breadcrumbList"
			)

			v-container(
				fluid
			)
				// Тут догружаются компоненты из роута
				transition( name="scale-transition")
					router-view
		setting

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import navigationBrawer from '@/components/main/navigation-drawer.vue';
import appbar from '@/components/main/app-bar.vue';
import setting from '@/views/main/Setting.vue';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	components: {
		navigationBrawer,
		appbar,
		setting,
	},
	props: {
	},
	data() {
		return {
			breadcrumbList: [],
		};
	},
	computed: {
		...mapGetters({
			appHtml: 'getHtmlParameters',
		}),
		breadcrumbs() {
			return this.appHtml.main.breadcrumbs;
		},
		background() {
			return this.appHtml.main.background;
		},
	},
	watch: {
		$route() {
			this.updateList();
		},
	},
	mounted() {
		this.updateList();
		this.checkSetting();
	},
	methods: {
		...mapActions({
			checkSetting: 'user/USER_CHECK_SETTINGS',
		}),
		routeTo(pRouteTo) {
			if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link);
		},
		updateList() { this.breadcrumbList = this.$route.meta.breadcrumb; },
	},
};
</script>
