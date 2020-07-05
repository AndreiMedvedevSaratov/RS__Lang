<template lang='pug'>
	v-row(
		class="wrap fill-height red darken-4"
		style="background-image: url('./assets/img/sprint/fon.jpg');"
		justify="center"
		)
		v-col(
			v-if="!gameStatus"
			cols="12"
			sm="4"
			align="center"
			class="start"
		)
			h2  {{ 'Sprint Game' | UP }}
			v-btn( @click="game(countWords);" )
				span( style="color: #112595" ) St
				span( style="color: #ba0410" ) art
		v-col(
			v-else
			cols="12"
			sm="8"
			align="center"
			class="start game"
		)
			div( v-if="loading" ) Please stand by
				v-progress-linear(
					indeterminate
					rounded
					color="red darken-4"
					class="mb-0"
				)
			v-card(
				v-else
				class="mx-auto"
				max-width="600"
			)
				v-img(
					v-if="nextCorrectWord"
					class="white--text align-center"
					height="200px"
					:src="getImg"
				)
					v-card-title( class="justify-center primary" ) {{ nextCorrectWord.wordTranslate }}
				v-card-text(
					v-if="nextCorrectWord"
				)
					v-btn(
						v-for="( word, i) in nextWords" :key="i"
						v-if="i <= 3"
						class="mx-2"
						outlined
						:color="word.correct ? (word.correct == true ? 'success' : 'error') : ''"
						@click="nextWord(word)"
					) {{ word.word }}
						br
						| {{ word.transcription }}

</template>

<script>
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
import { mapMutations, mapActions, mapGetters } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Sprint',
	components: {},
	filters: {
		UP(value) {
			return value.toUpperCase();
		},
	},
	props: [],
	data: () => ({
		gameStatus: false,
		loading: false,
		withImg: true,
		nextCorrectWord: null,
		nextWords: [],
		modifiedArray: [],
		currentPosition: 0,

		countWords: 20,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
		}),
		getImg() {
			return this.withImg ? `${this.urlFiles}${this.nextCorrectWord.image}` : './assets/img/sprint/fon3.jpg';
		},
	},
	watch: {},
	created() {},
	mounted() {
		this.appHtml([
			{ one: 'main', key: 'drawer', value: false },
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'app', key: 'background', value: 'red darken-4' },
			{ one: 'app', key: 'colorWhite', value: true },
		]);
		// TODO: проверить уход со страницы через сохранение статистики на слове
		// window.addEventListener('beforeunload', (e) => {
		// 	e.preventDefault();
		// 	const confirmationMessage = 'Почти закрыл';
		// 	console.log('Вроде сработало!');
		// 	return confirmationMessage;
		// }, false);
	},
	beforeDestroy() {
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
			{ one: 'app', key: 'colorWhite', value: false },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
		}),
		// n - колличество слов нужно угадать
		async game(n) {
			this.loading = true;
			this.gameStatus = true;

			await this.builderArray(n);

			this.nextWords = this.modifiedArray[this.currentPosition];

			const random = this.randomWord(0, Object.keys(this.nextWords).length - 1);

			// Рандомное слово
			this.nextCorrectWord = this.nextWords[random];

			await setTimeout(() => {
				this.loading = false;
			}, 500);
		},
		async builderArray(n) {
			await this.getWords({
				wordsPerPage: n * 4,
				filter: {
					userWord: null,
				},
			});
			const plen = Math.ceil(this.words.length / n);

			this.modifiedArray = this.words.reduce((p, c, i) => {
				if (i % plen === 0) p.push({});
				// eslint-disable-next-line no-param-reassign
				p[p.length - 1][i] = c;
				return p;
			}, []);
		},
		randomWord(min, max) {
			// случайное число от min до (max+1)
			const rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		},
		nextWord(word) {
			// eslint-disable-next-line no-underscore-dangle
			if	(word._id === this.nextCorrectWord._id) {
				console.log('Правильно');
			} else console.log('Не правильно');

			if (++this.currentPosition > this.countWords - 1) {
				this.alert({ status: 'info', data: 'Игра закончена' });
			} else {
				const next = Object.values(this.modifiedArray[this.currentPosition]);
				this.nextWords = next;
				const random = this.randomWord(0, this.nextWords.length - 1);
				// Рандомное слово
				this.nextCorrectWord = this.nextWords[random];
			}
		},
	},

};
</script>

<style lang='scss' scoped>
.wrap {
	background:fixed center no-repeat;
	background-size: auto;
	position: absolute;
	width: 100%;
    top: 0;

	.start {
		position: absolute;
		top: 40%;
	}
	.game {
		top: 15%!important;
	}
}
</style>
