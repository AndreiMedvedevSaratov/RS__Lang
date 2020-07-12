<template lang='pug'>
	v-card( color="basil" )
		v-card-title( class="text-center justify-center py-6" )
			h1( class="font-weight-bold display-3 basil--text" ) Мой словарь
		v-card-subtitle Всего слов: {{wordsStat.length}}/{{countWords}}
			v-btn(
				@click="getAggregatedWords({group: '',wordsPerPage: countWords,filter: {userWord: { $ne: null }}})"
				x-small
				tile
			) Загрузить все
		v-list-item-group
			v-virtual-scroll(
				:items="wordsStat"
				item-height="184"
				min-height="370"
				style="height: calc( 100vh - 234px )"
				bench="2"
			)
				template(v-slot="{ item }" )
					v-card( class="my-2"  )
						v-card-text( class="py-0" )
							v-row
								v-col
									b {{ item.word }}
									=' '
									| {{ item.transcription }}
									=' '
									v-btn(
										@click="playAudio(`${urlFiles}${item.audio}`)"
										icon
									)
										v-icon mdi-volume-high
									| audio
									br
									div( v-html="item.textMeaning")
									b translation:
									=" "
									| {{ item.wordTranslate }}
									br
									v-btn(
										@click="playAudio(`${urlFiles}${item.audioExample}`)"
										icon
									)
										v-icon mdi-volume-high
									span( v-html="item.textExample" )
									br
									b Давность: {{ item.userWord.optional.previousTrain ? item.userWord.optional.previousTrain : 'none' }}
									=' | '
									b Повторений: {{ item.userWord.optional.allRepeats ? item.userWord.optional.allRepeats : 'none' }}
									br
									b Уровень запоминания:
									=' '
									v-icon(
										small
										v-for="learnGroup in 5" :key="learnGroup"
										:color="(learnGroup <= item.userWord.optional.learnGroup) ? 'green' : ''"
									) mdi-circle
								v-col
									v-img(
										height="120"
										width="120"
										:src="`${urlFiles}${item.image}`"
									)
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
			wordsStat: 'getWords',
			urlFiles: 'getUrlFiles',
			countWords: 'getCountWords',
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
		this.getAggregatedWords({
			group: '',
			filter: {
				userWord: { $ne: null },
			},
		});
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
			getAggregatedWords: 'APP_GET_USER_WORDS_AGGREGATED',
		}),
		playAudio: (dataAudio) => {
			const audio = new Audio(dataAudio);
			audio.play();
		},
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
