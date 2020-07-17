<template lang='pug'>

	v-row
		v-col(
			cols="12"
			md="6"
		)
			//- stat-graph(
			//- 	:statistics='statistics'
			//- 	:graphWidth='500'
			//- 	:graphHeight='300'
			//- )
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
				v-card-title Информационный блок
				v-card-text( class="pb-0" )
					v-row
						v-col( cols="9" )
							v-text-field(
								v-model="wordId"
								label="Найти статистику по word ID"
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
								disabled
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.learnGroup"
								label="learnGroup"
								outlined
								disabled
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.allRepeats"
								label="allRepeats"
								outlined
								disabled
							)
						v-col( cols="6" )
							v-text-field(
								v-model="consoleData.optional.successRepeats"
								label="successRepeats"
								outlined
								disabled
							)
					v-text-field(
						v-model="consoleData.optional.previousTrain"
						label="previousTrain"
						outlined
						disabled
					)
					v-text-field(
						v-model="consoleData.optional.nextTrain"
						label="nextTrain"
						outlined
						disabled
					)
					v-switch( v-model="consoleData.optional.isDelete"
					class="ma-2" label="isDelete")
				v-card-actions()
					v-spacer
					v-btn( v-if="updateWord"  @click="saveStatWord()") Update
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
import StatGraph from '@/components/statGraph.vue';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Statistics',
	components: {
		StatGraph,
	},
	props: [],
	data: () => ({
		statistics: [
			{ date: '2020-07-01', words: 50, successWord: 50 },
			{ date: '2020-07-02', words: 49, successWord: 50 },
			{ date: '2020-07-03', words: 48, successWord: 50 },
			{ date: '2020-07-04', words: 49, successWord: 50 },
			{ date: '2020-07-05', words: 51, successWord: 50 },
			{ date: '2020-07-06', words: 52, successWord: 50 },
			{ date: '2020-07-07', words: 100, successWord: 50 },
			{ date: '2020-07-08', words: 88, successWord: 50 },
			{ date: '2020-07-09', words: 87, successWord: 50 },
			{ date: '2020-07-10', words: 88, successWord: 50 },
			{ date: '2020-07-11', words: 85, successWord: 50 },
			{ date: '2020-07-12', words: 79, successWord: 50 },
			{ date: '2020-07-13', words: 85, successWord: 50 },
		],
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
	created() {
		this.getWordStats();
	},
	mounted() {
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
		// async arrayWordStat() {
		// 	await this.getWordStats();
		// 	const res = [];
		// 	this.wordsStat.forEach((word) => {
		// 		const yes = res.some((item) => item.optional.previousTrain === word.optional.previousTrain);
		// 		if (yes) {
		// 			// eslint-disable-next-line no-underscore-dangle
		// 			const ind = res.indexOf(word.id);
		// 			res[ind].words += 1;
		// 			res[ind].successWord += word.optional.successRepeats;
		// 		} else {
		// 			res.push({ date: word.optional.previousTrain, words: 1, successWord: word.optional.successRepeats });
		// 		}
		// 	});
		// 	console.log(res);
		// 	return res;
		// },
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
