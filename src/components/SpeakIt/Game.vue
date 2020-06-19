<template lang='pug'>
  div( class="root" )
</template>

<script>
import Game from './components/organisms/Game/Game';

import { getWordsData } from './core/api/getWords/getWords';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'SpeakIt',
	components: {},
	props: [],
	data: () => ({

	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		game() {
			const root = document.querySelector('.root');

			const game = new Game(getWordsData);
			console.log(game);

			root.append(game.element);
		},
	},

};
</script>

<style lang='scss' scoped>

</style>
