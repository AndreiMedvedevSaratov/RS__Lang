<template lang='pug'>
	v-card( color="basil" )
		v-card-title( class="text-center justify-center py-6" )
			h1( class="font-weight-bold display-3 basil--text" ) Мой словарь

		v-expansion-panels(
			accordion
			inset
			hover
		)
			v-row
				v-col
					v-expansion-panel(
						v-for="(item,i) in wordsStat"
						:key="i"
					)
						v-expansion-panel-header {{ item.optional.name }}
						v-expansion-panel-content test test
				v-col
					v-expansion-panel(
						v-for="(item,i) in wordsStat"
						:key="i"
					)
						v-expansion-panel-header {{ item.optional.name }}
						v-expansion-panel-content test test

</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Dictionary',
	components: {},
	props: [],
	data: () => ({
		tab: null,
		items: [
			'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
		],
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
	}),
	computed: {
		...mapGetters({
			wordsStat: 'getWordsStat',
		}),
	},
	watch: {},
	created() {},
	mounted() {
		// Перед началом игры изменим стиль страницы
		this.appHtml([
			// Уберем хлебные крошки
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'main', key: 'background', value: '#FFFBE6' },
			// Изменим цвет header по таблице цветов
			// https://vuetifyjs.com/en/styles/colors/#sass-color-pack
			{ one: 'app', key: 'background', value: '#FFFBE6' },

		]);
		this.getWordStats();
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
		this.appHtml([
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'main', key: 'background', value: '' },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		...mapActions({
			getWordStats: 'APP_GET_USER_WORD_STAT',
			getAggregatedWords: 'APP_GET_USER_WORDS_AGGREGATED',
			getAggregatedWord: 'APP_GET_USER_WORD_AGGREGATED',
		}),
	},

};
</script>
<style lang='scss' scoped>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
