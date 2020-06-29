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
				audio: 'http://soundbible.com/mp3/Tires%20Squealing%201-SoundBible.com-847455988.mp3',
				audioMeaning: 'http://soundbible.com/mp3/normal_shotgun_-Soundeffects-1522730314.mp3',
				audioExample: 'http://soundbible.com/mp3/Public%20Transit%20Bus-SoundBible.com-671541921.mp3',
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
				showAudioExample: false,
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
