<template lang="pug">
	div
		card-item(
			:cardConfig="cardConfig"
			:wordInfo="wordInfo"
		)
</template>

<script>
import CardItem from './Card.vue';

export default {
	components: {
		CardItem,
	},
	data() {
		return {
			cardConfig: {
				word: 'agree',
				image: 'https://avatars.mds.yandex.net/get-zen_doc/1136050/pub_5b3c7384a8204700a9b3fdf2_5b3c74e556ce7800a921385a/scale_1200',
				audio: 'files/01_0001.mp3',
				audioMeaning: 'files/01_0001_meaning.mp3',
				audioExample: 'files/01_0001_example.mp3',
				textMeaning: 'To agree is to have the same opinion or belief as another person',
				textExample: 'The students agree they have too much homework',
				transcription: '[əgríː]',
				wordTranslate: 'согласна',
				textMeaningTranslate:
					'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
				textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
				id: 1,
			},
			wordInfo: {
				group: 2,
				learnData: new Date(2020, 6, 20, 15, 30),
			},
		};
	},
};
</script>

<style lang="scss" scoped></style>
