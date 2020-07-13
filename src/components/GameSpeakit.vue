<template lang="pug">
	div( class="game purple lighten-5" )

		div( class="main" )
			v-img(
				class="main__image"
				:src="getImg"
				contain
			)
			v-row
				v-col
					v-btn(
						@click="speak"
						id="btn"
						raised
						block
						:disabled="gameStatus"
					) Start Game
				v-col
					v-btn(
						@click="stop_speak"
						id="btn"
						raised
						block
						:disabled="!gameStatus"
					) Stop Game

			div( v-show="gameStatus" ) You said:
				span( class='speech' )

			div( class="card-pannel purple lighten-5" )
				div(
					class="card ma-1 purple darken-1 white--text"
					v-for="(item, i) in isWords"
					:key="i"
					@click="gameAction({ image: isUrlFiles+item.image, audio: isUrlFiles+item.audio })"
					v-bind:id="item.word.toLowerCase()"
				)
					span( class="card__icon" )
					div( class="card__info" )
						p( class="card__info__word" ) {{ item.word }}
						p( class="card__info__transcription" ) {{ item.transcription }}
						p( class="card__info__translation" ) {{ item.wordTranslate }}

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'SpeakIt',
	components: {},
	props: [],
	data: () => ({
		status: '',
		count: [],
		gameStatus: false,
		gameLevel: 0,
		recognition: '',
		img: null,
	}),
	computed: {
		...mapGetters({
			isWords: 'getWords',
			isUrlFiles: 'getUrlFiles',
			UrlImage: 'getUrlImage',
		}),
		getWordsArray() {
			return this.isWords.map((item) => item.word.toLowerCase());
		},
		getImageArray() {
			return this.isWords.map((item) => item.image);
		},
		getImg() {
			return this.img ? this.img : this.UrlImage;
		},
	},
	watch: {},
	created() {},
	mounted() {
		/** Examples
     * this.getWords(); page - 0, group - 0
     * this.getWords({ page: 2 });
     * this.getWords({ page: 2, group: 3 });
     * this.getWords({ group: 3 });
     */
		this.getWords({
			page: 0,
			filter: {
				$or: [
					{
						userWord: { $ne: null },
					},
					{
						userWord: null,
					},
				],
			},
		});
		this.appHtml([
			// свернем меню
			{ one: 'main', key: 'drawer', value: false },
			// Уберем хлебные крошки
			{ one: 'main', key: 'breadcrumbs', value: false },
			// Изменим цвет header по таблице цветов
			// https://vuetifyjs.com/en/styles/colors/#sass-color-pack
			{ one: 'main', key: 'background', value: 'purple lighten-5' },
			{ one: 'app', key: 'background', value: 'purple lighten-5' },
		]);
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'main', key: 'background', value: '' },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
			wordProcessing: 'APP_WORD_PROCESSING',
		}),
		gameAction(data) {
			if (!this.gameStatus) this.setImgAndAudio({ image: data.image, audio: data.audio });
		},
		speak() {
			this.gameStatus = true;
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			this.recognition = new SpeechRecognition();
			this.recognition.lang = 'en-US';
			this.recognition.continuos = false;
			this.recognition.interimResults = false;
			this.recognition.maxAlternatives = 1;
			this.recognition.onerror = (event) => {
				console.log(`It's error! ${event.error}`);
			};
			this.recognition.onend = () => this.recognition.start();

			this.recognition.addEventListener('result', (event) => {
				const last = event.results.length - 1;
				const sayWord = event.results[last][0].transcript.toLowerCase();
				const p = document.querySelector('.speech');
				p.textContent = sayWord;

				if (this.getWordsArray.includes(sayWord)) {
					document.querySelector('.main__image').src = `${this.isUrlFiles}${this.getImageArray[this.getWordsArray.indexOf(sayWord)]}`;
					document.getElementById(sayWord).style.opacity = '0.5';
					if (!this.count.includes(sayWord)) {
						this.count.push(sayWord);
						const getCorrectWord = this.getWordsArray.find((item) => item.word === sayWord);
						if (getCorrectWord !== undefined) this.wordProcessing({ word: getCorrectWord, right: true, offDate: true });
					}

					if (this.count.length === 20) {
						const cards = document.querySelectorAll('.card');
						for (let i = 0; i < cards.length; i += 1) {
							cards[i].style.opacity = '';
						}
						// document.querySelectorAll('.card').forEach((item) => {
						// 	// eslint-disable-next-line no-param-reassign
						// 	item.style.opacity = '1';
						// 	return item;
						// });
						this.alert({ data: 'Youre win, good job! Your skill is pretty high' });
						this.gameLevel += 1;
						this.getWords({
							page: this.gameLevel,
							filter: {
								$or: [
									{
										userWord: { $ne: null },
									},
									{
										userWord: null,
									},
								],
							},
						}, { root: true });
						this.recognition.onend = () => this.recognition.stop();
						this.count.length = 0;
					}
				}
			});
			this.recognition.start();
		},
		stop_speak() {
			this.gameStatus = false;
			this.recognition.onend = () => this.recognition.stop();
			this.count.length = 0;
		},
		setImgAndAudio(payload) {
			this.img = payload.image;
			const audio = new Audio(payload.audio);
			audio.play();
		},
	},
};
</script>

<style lang='scss' scoped>
.game {
  height: 100%;
  padding: 0 15%;
  background-color: #ccd8cc;
  box-sizing: border-box;

  p {
    margin: 0;
  }

  .header {
    background-color: #909f8d;
    height: 10%;
  }
  .main {
    height: 80%;

    &__image {
      padding: 2% 0;
      max-width: 300px;
      display: block;
      margin: 0 auto;
      //   height: 40%;
      align-items: center;
    }
    .card-pannel {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      background-color: #a4aea2;
      padding: 5px;
      box-sizing: border-box;
      // height: calc(30% - 10px);
      .card {
        width: 150px;
        height: 72px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #d8c9d8;
        border: #dadada solid 1px;

        &__icon {
          background-color: #bbb0bb;
          text-align: center;
          flex: 1;
          width: 30px;
          height: 30px;
          background: url('../assets/img/speaker.svg') no-repeat center content-box;
        }

        &__info {
          text-align: center;
          flex: 3;
        }

        &:hover {
          background-color: #bab1ba;
        }
      }
    }
  }
  .buttonsRow {
    background-color: #bbc9b8;
    height: 10%;
  }
}
</style>
