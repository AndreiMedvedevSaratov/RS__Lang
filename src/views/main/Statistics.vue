<template lang='pug'>

	v-row
		v-col(
			cols="12"
			md="6"
		)
			v-card(
				class="mx-auto"
			)
				v-card-title Получить слова

				v-card-text(class="text--primary")
				v-row( class="ma-0" )
					v-col(
						cols="12"
						md="4"
					)
						v-text-field(
							v-model="page"
							label="page"
						)
					v-col(
						cols="12"
						md="4"
					)
						v-text-field(
							v-model="group"
							label="group"
						)
					v-col(
						cols="12"
						md="4"
					)
						v-btn( @click="getWords({page, group})" outlined ) Request
				v-row( class="ma-0" )
					v-col(cols="12")
						v-chip-group(
							column
							v-if="words.length > 0"
						)
							v-chip(
								v-for="word in words"
								:key="word.id"
								@click="clickWord(word)"
							) {{ word.word }}
						span(v-else) Request words...
			v-card(
				class="mt-3"
			)
				v-card-title Все слова где есть статистика
					v-spacer
					v-btn(@click="getWordStats()" outlined ) Update

				v-card-text(class="text--primary")
					v-row( class="ma-0" )
						v-col(cols="12")
							v-chip-group(
								column
								v-if="wordsStat.length > 0"
							)
								v-chip(
									v-for="word in wordsStat"
									:key="word.id"
									close
									:color="word.wordId == wordId?'success': ''"
									@click="clickWordStat(word)"
									@click:close="delWordStat(word.wordId)"
								) {{ word.optional.name || 'none' }}
							span(v-else) There are no words with statistics...
		v-col(
			cols="12"
			md="6"
		)
			v-card()
				v-card-title Создать / Обновить статистику по слову
				v-card-text( class="pb-0" )
					v-row
						v-col( cols="9" )
							v-text-field(
								v-model="wordId"
								label="Word ID"
								outlined
							)
						v-col( cols="3" )
							v-btn(
								@click="getWordStats(wordId)"
								:disabled="wordId.length === 0"
								outlined
							) Request
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.name"
								label="Name"
								outlined
								required
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.learnGroup"
								label="learnGroup"
								outlined
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.allRepeats"
								label="allRepeats"
								outlined
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.successRepeats"
								label="successRepeats"
								outlined
								required
							)
					v-text-field(
						v-model="consoleData.optional.previousTrain"
						label="previousTrain"
						outlined
					)
					v-text-field(
						v-model="consoleData.optional.nextTrain"
						label="nextTrain"
						outlined
					)
					v-switch( v-model="consoleData.optional.isDelete"
					class="ma-2" label="isDelete")
				v-card-actions()
					v-spacer
					v-btn( @click="saveStatWord()") {{ !updateWord ? 'Create' : 'Update' }}
		v-dialog(
			v-model="dialog"
			max-width="500px"
		)
			v-card
				v-card-title
					span Data
					v-spacer
					span Меню
				v-card-text
					span( v-for="(value, key, i) in dialogData" :key="i")
						b {{ key }} :
						|  {{ value }}
						br
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Statistics',
	components: {},
	props: [],
	data: () => ({
		page: 0,
		group: 0,
		wordId: '',
		dialog: false,
		dialogData: {},
		consoleData: {
			difficulty: '',
			optional: {
				name: '',
				learnGroup: 1,
				isDelete: false,
				allRepeats: 0,
				successRepeats: 0,
				previousTrain: '',
				nextTrain: '',
			},
		},
		updateWord: false,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			wordsStat: 'getWordsStat',
		}),
	},
	watch: {
		wordId() {
			this.updateWord = this.wordsStat.some((word) => word.wordId === this.wordId);
		},
	},
	created() {},
	mounted() {
		// this.getAggregatedWord('5e9f5ee35eb9e72bc21af4a3');
		this.getWord({ wordId: '5e9f5ee35eb9e72bc21af4a3' });
	},
	methods: {
		...mapActions({
			getWord: 'APP_GET_WORD',
			getWords: 'APP_GET_WORDS',
			getWordStats: 'APP_GET_USER_WORD_STAT',
			setWordStat: 'APP_SET_USER_WORD_STAT',
			delWordStat: 'APP_DELETE_USER_WORD_STAT',
			getAggregatedWords: 'APP_GET_USER_WORDS_AGGREGATED',
			getAggregatedWord: 'APP_GET_USER_WORD_AGGREGATED',
		}),
		clickWord(word) {
			this.dialogData = word;
			this.dialog = true;
		},
		saveStatWord() {
			// eslint-disable-next-line no-unused-expressions
			this.dialog = false;
			const method = this.updateWord ? 'put' : 'post';

			this.setWordStat({ wordId: this.wordId, wordStat: this.consoleData, method });
			this.getWordStats();
		},
		clickWordStat(wordData) {
			this.wordId = wordData.wordId;
			this.consoleData = {
				difficulty: wordData.difficulty,
				optional: {
					name: wordData.optional.name,
					learnGroup: wordData.optional.learnGroup || 1,
					isDelete: wordData.optional.isDelete || false,
					allRepeats: wordData.optional.allRepeats || 0,
					successRepeats: wordData.optional.successRepeats || 0,
					previousTrain: wordData.optional.previousTrain || new Date(),
					nextTrain: wordData.optional.nextTrain || new Date(),
				},
			};
		},
	},

};
</script>

<style lang='scss' scoped>

</style>
