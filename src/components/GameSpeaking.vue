<template lang="pug">
	div( class="game" )

		div( class="main" )
			video(
				class="main__image"
				controls
				id="video"
			)
				source(
					:src="isVideoSrc"
					type="video/mp4"
				)

			div(
				class="amber darken-4 answer"
				)

			input(
				type="button"
				value="undefined"
				@click="game()"
				id="btn"
			)

			p( class='speech' )

</template>

<script>
import { mapGetters, /*  mapMutations, */ mapActions } from 'vuex';

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
			isVideoSrc: 'speaking/getSrcVideo',
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
	},
	methods: {
		// ...mapMutations({
		// 	speak: 'speaking/SPEAKING_SPEAK',
		// }),
		...mapActions({
			game: 'speaking/SPEAKING_GAME',
		}),
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
			//   height: 40%;
			align-items: center;
		}
	}

	.answer {
		display:block;

	}
}
</style>
