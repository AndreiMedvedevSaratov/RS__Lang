<template lang='pug'>
	v-row(
		align="center"
	)
		v-col(
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		)
			h3( class="mb-3"  ) Игры
			v-card(
				:color="game.color"
				class="mb-2"
				dark
				v-for="(game, i) in gameList" :key="i"
			)
				div(
					class="d-flex flex-no-wrap justify-space-between"
				)
					div
						v-card-title(
							class="headline text-wrap"
							style="word-break: break-word;"
						) {{ game.title }}

						v-card-subtitle {{ game.subtitle }}

						v-card-actions
							v-btn( :to="game.link" class="mx-2" small outlined ) Запустить

					v-avatar(
						class="ma-3"
						size="125"
						tile
					)
						v-img( :src="game.img")

</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {},
	props: {
	},
	data: () => ({
		gameList: [
			{
				title: 'English puzzle',
				subtitle: 'Collect the puzzle to get a picture',
				link: '/english-puzzle',
				img: 'assets/img/puzzle.png',
				color: 'green',
			},
			{
				title: 'Speaking',
				subtitle: 'textextexetxte',
				link: '/speaking',
				img: 'assets/img/speaking.png',
				color: 'primary',
			},
			{
				title: 'Dictionary',
				subtitle: 'textextexetxte',
				link: '/dictionary',
				img: 'assets/img/dictionary.png',
				color: 'red',
			},
		],
	}),
	computed: {
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
	},
};
</script>
