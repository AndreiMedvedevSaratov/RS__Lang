<template lang="pug">
	div
		card-item(
			:config="cardConfig"
			:userSettings="settings"
		)
</template>

<script>
import CardItem from './Card.vue';

export default {
	name: 'MainGame',
	components: {
		CardItem,
	},
	data() {
		return {
			cardConfig: {
				word: 'agree',
				image:
					'https://avatars.mds.yandex.net/get-zen_doc/1136050/pub_5b3c7384a8204700a9b3fdf2_5b3c74e556ce7800a921385a/scale_1200',
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
				userWord: {
					learnGroup: 2,
					dictionaryGroup: 'easy',
					allRepeats: 10,
					successRepeats: 7,
					previousTrain: new Date(2020, 5, 20),
					nextTrain: new Date(2020, 5, 23),
				},
			},
			settings: {
				wordsLimit: 50,
				showWordTranslate: true,
				showTranscription: true,
				showImage: true,
				showTextMeaning: true,
				showTextMeaningTranslate: true,
				showAudioMeaning: true,
				showTextExample: true,
				showTextExampleTranslate: true,
				showAudioExample: true,
			},
		};
	},
};
</script>

<style lang="scss" scoped></style>
