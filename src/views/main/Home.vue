<template lang='pug'>
	div
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
								:content="i+1"
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
								:content="i+1"
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
	data: () => ({
		gameList: [
			{
				title: 'Main game',
				subtitle: 'Test your knowledge of English',
				link: '/main-game',
				img: 'assets/img/main.png',
				color: 'red',
			},
			{
				title: 'English puzzle',
				subtitle: 'Collect the puzzle to get a picture',
				link: '/english-puzzle',
				img: 'assets/img/puzzle.png',
				color: 'green',
			},
			{
				title: 'Speaking',
				subtitle: 'Train your skills in dialogue game',
				link: '/speaking',
				img: 'assets/img/speaking.png',
				color: 'primary',
			},
			{
				title: 'Спринт',
				subtitle: 'Catch the time to guess the words, the countdown has begun..',
				link: '/sprint',
				img: 'assets/img/спринт.png',
				color: 'red darken-4',
			},
			{
				title: 'SpeakIt',
				subtitle: 'Check your pronunciation skills',
				link: '/speakit',
				img: 'assets/img/speakit.png',
				color: 'purple lighten-1',
			},
			{
				title: 'Аудиовызов',
				subtitle: 'Train your listening skills',
				link: '/AudioVizov',
				img: 'assets/img/аудиовызов.png',
				color: 'pink darken-1',
			},
		],
	}),
};
</script>
