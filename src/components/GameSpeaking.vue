<template lang="pug">
	div( class="game" )
		div( class="main" )
			video(
				class="video"
				controls
				id="video"
				)
				source(
					:src="myVideosForGame[step]"
					type="video/mp4"
					)
			div(
				class="answer"
			)
			input(
				type="button"
				value="Speaking"
				@click="video()"
				id="btn"
				)
			p(
				class='speech'
				)
			div( v-if="loading"
				class="load" ) Loading... please wait...
				v-progress-linear(
					indeterminate
					rounded
					color="blue darken-2"
					)
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
		loading: false,
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
	mounted() {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 2500);
		this.appHtml([
			{ one: 'main', key: 'drawer', value: false },
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'app', key: 'background', value: 'blue darken-2' },
			{ one: 'app', key: 'colorWhite', value: true },
		]);
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
	height: 100vh;
	box-sizing: border-box;
}
p {
	margin: 0;
}
.main {
	position: relative;
	width: 100%;
	height: 450px;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.video {
	position: relative;
	width: 300px;
	height: 300px;
	display: flex;
	margin: 0 auto;
	align-items: center;
	border-radius: 5px;
}

.answer {
	position: relative;
	display: block;
	top: 10px;
	color: #1976D2;
	text-align: center;
}

#btn {
	display: block;
	width: 150px;
	height: 60px;
	top: 20px;
	border-radius: 5px;
	color: white;
	align-items: center;
	background: #1976D2;
	position: relative;
	left: 50%;
	transform: translate(-50%, 0);
}
.load {
	position: relative;
	top: 20px;
	color: #1976D2;
}
</style>
