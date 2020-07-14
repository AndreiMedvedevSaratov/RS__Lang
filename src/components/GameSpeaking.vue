<template lang="pug">
	div( class="game" )

		div( class="main" )
			video(
				class="main__image"
				controls
				id="video"
			)
				source(
					:src="myVideosForGame[step]"
					type="video/mp4"
				)

			div(
				class="amber darken-4 answer"
				)

			input(
				type="button"
				value="Button"
				@click="video()"
				id="btn"
			)

			p( class='speech' )

</template>

<script>
import { mapGetters, mapMutations/* , mapActions */ } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'speaking',
	components: {},
	props: [],
	data: () => ({
		myVideosForGame: ['./assets/video/first.mp4', './assets/video/second.mp4'],
		step: 0,
	}),
	computed: {
		...mapGetters({
			videoIsEnded: 'speaking/getVideoIsEnded',
		}),
	},
	watch: {
		videoIsEnded() {
			this.answer();
			this.speak();
			this.videoIsEnded = false;
			this.step += 1;
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations({
			video: 'speaking/SPEAKING_VIDEO',
			answer: 'speaking/SPEAKING_ANSWER',
			speak: 'speaking/SPEAKING_SPEAK',
		}),
		// ...mapActions({
		// 	game: 'speaking/SPEAKING_GAME',
		// }),
	},
};
</script>

<style lang="scss" scoped>
.game {
	height: 100%;
	padding: 0 15%;
	background-color: #ccd8cc;
	box-sizing: border-box;

	p {
		margin: 0;
	}

	.main {
		height: 80%;

		&__image {
			padding: 2% 0;
			max-width: 300px;
			display: block;
			margin: 0 auto;
			align-items: center;
		}
	}

	.answer {
		display: block;
	}
}
</style>
