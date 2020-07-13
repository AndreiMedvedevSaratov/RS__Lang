<template lang="pug">
	stat-graph(
		:statistics='statistics'
		:graphWidth='500'
		:graphHeight='300'
	)
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

<style lang="scss" scoped></style>
