<template lang="pug">
	div
		card-item(
			:config="cardConfig"
			:userSettings="settings"
			@new-word='showNewWord'
		)
</template>

<script>
import { forGame } from '@/store/modules/forGame';
import CardItem from './Card.vue';

export default {
	name: 'MainGame',
	components: {
		CardItem,
	},
	mixins: [forGame],
	props: {},
	data() {
		return {
			cardConfig: {
				word: 'agree',
				image:
					'https://avatars.mds.yandex.net/get-zen_doc/1136050/pub_5b3c7384a8204700a9b3fdf2_5b3c74e556ce7800a921385a/scale_1200',
				audio: 'https://audio00.forvo.com/audios/mp3/n/0/n0_8971826_39_6125_1.mp3',
				audioMeaning: 'http://soundbible.com/mp3/normal_shotgun_-Soundeffects-1522730314.mp3',
				audioExample: 'https://audio00.forvo.com/mp3/9599481/39/9599481_39_7095260.mp3',
				textMeaning: 'To agree is to have the same opinion or belief as another person',
				textExample: 'I am sure every impartial man will agree',
				transcription: '[əgríː]',
				wordTranslate: 'согласна',
				textMeaningTranslate:
					'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
				textExampleTranslate: 'Я уверен, что каждый беспристрастный человек согласиться',
				id: 1,
				userWord: {
					learnGroup: 2,
					dictionaryGroup: 2,
					allRepeats: 10,
					successRepeats: 7,
					previousTrain: new Date(2020, 5, 20),
					nextTrain: new Date(2020, 5, 23),
				},
			},
			settings: {
				wordsLimit: 4,
				showWordTranslate: true,
				showTranscription: true,
				showImage: true,
				showTextMeaning: true,
				showTextMeaningTranslate: true,
				showAudioMeaning: false,
				showTextExample: true,
				showTextExampleTranslate: true,
				showAudioExample: true,
			},
		};
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	update() {},
	methods: {
		showNewWord() {
			this.cardConfig = this.getNextWord();
		},
	},
};
</script>

<style lang="scss" scoped></style>
