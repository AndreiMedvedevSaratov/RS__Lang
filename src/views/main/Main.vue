<template lang="pug">
	v-app( id="inspire")

		// Компонент NavigationDrawer
		navigationBrawer

		// Компонент AppBar
		appbar

		v-main
			// Хлебные крошки
			v-breadcrumbs( :items="breadcrumbList" )

			v-container(
				fluid
			)
				// Тут догружаются компоненты из роута
				transition( name="scale-transition")
					router-view

</template>

<script>
import navigationBrawer from '@/components/main/navigation-drawer.vue';
import appbar from '@/components/main/app-bar.vue';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	components: {
		navigationBrawer,
		appbar,
	},
	props: {
	},
	data() {
		return {
			breadcrumbList: [],
		};
	},
	watch: {
		$route() {
			this.updateList();
		},
	},
	mounted() {
		this.updateList();
	},
	methods: {
		routeTo(pRouteTo) {
			if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link);
		},
		updateList() { this.breadcrumbList = this.$route.meta.breadcrumb; },
	},
};
</script>
