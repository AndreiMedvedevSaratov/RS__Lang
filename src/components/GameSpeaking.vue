<template lang="pug">
	div( class="game" )

		div( class="main" )
			video(
				class="main__image"
				controls
			)
				source(
					:src="isVideoSrc"
					type="video/mp4"
				)

			input(
				type="button"
				value="undefined"
				@click="speak()"
				id="btn"
			)

			p( class='speech' )

			div( class="card-pannel" )
				div(
					class="card"
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
	name: 'speaking',
	components: {},
	props: [],
	data: () => ({}),
	computed: {
		...mapGetters({
			isWords: 'speakit/getWords',
			isUrlFiles: 'speakit/getUrlFiles',
			isVideoSrc: 'speaking/getSrcVideo',
			isUrlImage: 'speakit/getUrlImage',
			gameStatus: 'speakit/gameStatus',
		}),
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
		this.getWords();
	},
	methods: {
		...mapActions({
			getWords: 'speakit/GET_WORDS',
			speak: 'speakit/SPEAKIT_SPEAK',
		}),
		...mapMutations({
			setImgAndAudio: 'speakit/SPEAKIT_SET_IMAGE_AND_AUDIO',
		}),
		gameAction(data) {
			if (!this.gameStatus) this.setImgAndAudio({ image: data.image, audio: data.audio });
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
        height: 60px;
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
