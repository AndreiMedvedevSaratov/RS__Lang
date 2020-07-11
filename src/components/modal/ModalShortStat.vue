<template lang='pug'>
	div
		v-dialog(
			v-model="showStatistics"
			v-if="words"
			scrollable
			persistent
			:max-width="textExample ? 700 : 500"
		)
			v-card
				v-card-title
					| {{ title }}
					v-spacer
					v-chip(
						color="error"
						class="mr-2"
						small
						label
					) {{words.wrong.length}}
					v-chip(
						color="success"
						class="mr-2"
						small
						label
					) {{words.correct.length}}
					v-chip(
						color="primary"
						class="mr-2"
						small
						label
					) {{words.correct.length + words.wrong.length}}
					v-spacer
					v-btn(
						@click="showStatistics = false"
						icon
						tile
					)
						v-icon( color="warning" ) mdi-close-circle-outline
				v-divider
				v-card-text
					v-list(
						dense
						inactive
					)
						span( class="font-weight-medium" ) Ошибок
							=' '
							v-chip(
								color="error"
								small
								label
							) {{words.wrong.length}}
						v-list-item-group
							v-virtual-scroll(
								:items="words.wrong"
								:item-height="textExample ? 100 : 50"
								:height="textExample ? 200 : 150"
							)
								template( v-slot="{ item }" )
									v-list-item(
										@click="playAudio(`${urlFiles}${textExample ? item.audioExample : item.audio}`)"
									)
										v-list-item-icon
											v-icon mdi-volume-high
										v-list-item-content
											v-list-item-title {{ item.word }}
												=' - '
												span( class="font-weight-light" ) {{ item.wordTranslate }}
											span(
												v-if="textExample"
												class="text-wrap"
												v-html="`<b>en</b>:  ${item.textExample}`"
											)
											span(
												v-if="textExample"
												class="text-wrap"
												v-html="`<b>ru</b>:  ${item.textExampleTranslate}`"
											)
						span( class="font-weight-medium" ) Правильных
							=' '
							v-chip(
								color="success"
								small
								label
							) {{words.correct.length}}
						v-list-item-group
							v-virtual-scroll(
								:items="words.correct"
								:item-height="textExample ? 100 : 50"
								:height="textExample ? 200 : 150"
							)
								template( v-slot="{ item }" )
									v-list-item(
										@click="playAudio(`${urlFiles}${textExample ? item.audioExample : item.audio}`)"
									)
										v-list-item-icon
											v-icon mdi-volume-high
										v-list-item-content
											v-list-item-title {{ item.word }}
												=' - '
												span( class="font-weight-light" ) {{ item.wordTranslate }}
											span(
												v-if="textExample"
												class="text-wrap"
												v-html="`<b>en</b>:  ${item.textExample}`"
											)
											span(
												v-if="textExample"
												class="text-wrap"
												v-html="`<b>ru</b>:  ${item.textExampleTranslate}`"
											)
				v-divider
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'SprintModalShort',
	components: {},
	props: {
		title: {
			type: String,
			default: 'Statistics',
		},
		words: {
			type: Object,
			required: true,
		},
		textExample: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({

	}),
	computed: {
		...mapGetters({
			getShortStatistics: 'showShortStatistics',
			urlFiles: 'getUrlFiles',
		}),
		showStatistics: {
			get() {
				return this.getShortStatistics;
			},
			set() {
				this.offStatistics();
			},
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapMutations({
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		playAudio: (dataAudio) => {
			const audio = new Audio(dataAudio);
			audio.play();
		},
	},

};
</script>

<style lang='scss' scoped>

</style>
