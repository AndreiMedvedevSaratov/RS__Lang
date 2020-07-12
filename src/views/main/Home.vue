<template lang='pug'>
	div
		v-row(
			align="center"
			justify="center"
		)
				v-col(
					cols="12"
					xl="6"
					lg="8"
					md="8"
					sm="12"
				)
					v-card(
						color="red"
						class="mb-2"
						dark
					)
						div(
							class="d-flex flex-no-wrap justify-space-between"
						)
							div
								v-badge(
									color="blue-grey darken-4"
									overlap
									left
									content="1"
								)
									v-card-title(
										class="headline text-wrap"
										style="word-break: break-word;"
									) Main game
										p( class="text-right text-caption" ) Test your knowledge of English
								v-btn( to="/" class="mt-4" absolute right small outlined ) Запустить

		v-row(
			align="center"
			justify="center"
		)
			v-col(
				cols="12"
				xl="3"
				lg="4"
				md="4"
				sm="6"
			)
				v-card(
					:color="game.color"
					class="mb-2"
					dark
					v-for="(game, i) in gameList" :key="i"
					v-if="i < 3"
				)
					div(
						class="d-flex flex-no-wrap justify-space-between"
					)
						div
							v-badge(
								color="blue-grey darken-4"
								overlap
								left
								:content="i+2"
							)
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
			v-col(
				v-if="gameList.length > 3"
				cols="12"
				xl="3"
				lg="4"
				md="4"
				sm="6"
			)
				v-spacer
				v-card(
					:color="game.color"
					class="mb-2"
					dark
					v-for="(game, i) in gameList" :key="i"
					v-if="i > 2"
				)
					div(
						class="d-flex flex-no-wrap justify-space-between"
					)
						div
							v-badge(
								color="blue-grey darken-4"
								overlap
								left
								:content="i+2"
							)
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
				title: 'speaking',
				subtitle: 'textextexetxte',
				link: '/speaking',
				img: 'assets/img/speaking.png',
				color: 'primary',
			},
			{
				title: 'SpeakIt',
				subtitle: 'textextexetxte',
				link: '/speakit',
				img: 'assets/img/speakit.png',
				color: 'grey',
			},
			{
				title: 'Саванна',
				subtitle: 'textextexetxte',
				link: '/savanna-game',
				img: 'assets/img/саванна.png',
				color: 'blue',
			},
			{
				title: 'Аудиовызов',
				subtitle: 'textextexetxte',
				link: '/AudioVizov',
				img: 'assets/img/аудиовызов.png',
				color: 'pink darken-1',
			},
			{
				title: 'Спринт',
				subtitle: 'Catch the time to guess the words, the countdown has begun..',
				link: '/sprint',
				img: 'assets/img/спринт.png',
				color: 'red darken-4',
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
