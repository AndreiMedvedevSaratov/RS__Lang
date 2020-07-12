<template lang='pug'>
	v-bottom-sheet( v-model="show")
		v-list
			v-subheader Open in
			v-list-item(
				v-for="tile in tiles"
				:key="tile.title"
				@click="show = false"
			)
				v-list-item-title {{ tile.title }}
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Setting',
	components: {},
	props: [],
	data: () => ({
		sheet: false,
		tiles: [
			{ title: 'Карточки' },
			{ title: 'Картинки' },
			{ title: 'Звуки' },
			{ title: 'Подсказки' },
		],
	}),
	computed: {
		...mapGetters({
			getShowSetting: 'showSetting',
		}),
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
		...mapMutations({
			setShowSetting: 'APP_SHOW_SETTING',
		}),
	},

};
</script>

<style lang='scss' scoped>

</style>
