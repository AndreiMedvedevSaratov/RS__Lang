<template lang='pug'>
	v-bottom-sheet(
		v-model="show"
		persistent
	)
		v-card
			v-toolbar(dark color="primary")
				v-btn( icon dark @click="show = false")
					v-icon mdi-close
				v-spacer
				v-toolbar-items
					v-btn( dark text @click="saveSetting" ) Save
			v-row
				v-col
					v-list( three-line subheader)
						v-list-item
							v-list-item-content
								v-list-item-title Карточек в день
								v-list-item-subtitle В некоторых мини играх, лимит увеличивается по запросу.
								v-text-field(
									v-model="wordsPerDay"
									type="number"
									shaped
									outlined
								)
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox( v-model="showWordTranslate")
							v-list-item-content
								v-list-item-title Перевод слова
								v-list-item-subtitle Есть мини игры где перевод требуется, включается по запросу.
						v-divider
						v-list-item
							v-list-item-content
								v-list-item-title Выбрать слова
								v-list-item-subtitle Возможность выбора изучения слов: вперемешку, новые или повторять
								v-select(
									v-model="choiceWords"
									:items="items"
									label="Ваш выбор"
									dense
									solo
								)
				v-divider( vertical )
				v-col
					v-list( three-line subheader)
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showTextExample")
							v-list-item-content
								v-list-item-title Пример текста
								v-list-item-subtitle Предложение в котором участвует английское слово.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showTextExampleTranslate")
							v-list-item-content
								v-list-item-title Перевод текста
								v-list-item-subtitle Переведенный на русский пример текста.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showTextMeaning")
							v-list-item-content
								v-list-item-title Смысл слова
								v-list-item-subtitle Текст с обьяснением значения слова, на английском.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showTextMeaningTranslate")
							v-list-item-content
								v-list-item-title Перевод текста "смысла" слова
								v-list-item-subtitle Текст смысла слова на русском.
				v-divider( vertical )
				v-col
					v-list( three-line subheader)
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showAudioExample")
							v-list-item-content
								v-list-item-title Аудио - текста
								v-list-item-subtitle Разрешаете включать аудио запись текста.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showAudioMeaning")
							v-list-item-content
								v-list-item-title Аудио - "смысла" текста
								v-list-item-subtitle Разрешаете включать аудио запись "смысла" текста.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showTranscription")
							v-list-item-content
								v-list-item-title Транскрипция слова
								v-list-item-subtitle Разрешаете показывать транскрипцию.
						v-divider
						v-list-item
							v-list-item-action
								v-checkbox(v-model="showImage")
							v-list-item-content
								v-list-item-title Показывать картинку слова
								v-list-item-subtitle Разрешаете показывать картинку по слову.
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Setting',
	components: {},
	props: [],
	data: () => ({
		items: [
			{
				text: 'Вперемешку',
				value: 1,
			},
			{
				text: 'Новые слова',
				value: 2,
			},
			{
				text: 'Слова для повторений',
				value: 3,
			},
		],
	}),
	computed: {
		...mapGetters({
			getShowSetting: 'showSetting',
			getSetting: 'user/getSetting',
		}),
		show: {
			get() {
				return this.getShowSetting;
			},
			set() {
				this.setShowSetting();
			},
		},
		choiceWords: {
			get() {
				return this.getSetting.optional.choiceWords;
			},
			set(value) {
				this.setSetting({ key: 'choiceWords', value });
			},
		},
		wordsPerDay: {
			get() {
				return this.getSetting.wordsPerDay;
			},
			set(value) {
				this.setSetting({ value });
			},
		},
		showWordTranslate: {
			get() {
				return this.getSetting.optional.showWordTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showWordTranslate', value });
			},
		},
		showTranscription: {
			get() {
				return this.getSetting.optional.showTranscription;
			},
			set(value) {
				this.setSetting({ key: 'showTranscription', value });
			},
		},
		showImage: {
			get() {
				return this.getSetting.optional.showImage;
			},
			set(value) {
				this.setSetting({ key: 'showImage', value });
			},
		},
		showTextMeaning: {
			get() {
				return this.getSetting.optional.showTextMeaning;
			},
			set(value) {
				this.setSetting({ key: 'showTextMeaning', value });
			},
		},
		showTextMeaningTranslate: {
			get() {
				return this.getSetting.optional.showTextMeaningTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showTextMeaningTranslate', value });
			},
		},
		showAudioMeaning: {
			get() {
				return this.getSetting.optional.showAudioMeaning;
			},
			set(value) {
				this.setSetting({ key: 'showAudioMeaning', value });
			},
		},
		showTextExample: {
			get() {
				return this.getSetting.optional.showTextExample;
			},
			set(value) {
				this.setSetting({ key: 'showTextExample', value });
			},
		},
		showTextExampleTranslate: {
			get() {
				return this.getSetting.optional.showTextExampleTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showTextExampleTranslate', value });
			},
		},
		showAudioExample: {
			get() {
				return this.getSetting.optional.showAudioExample;
			},
			set(value) {
				this.setSetting({ key: 'showAudioExample', value });
			},
		},
	},
	watch: {
		wordsPerDay(num) {
			if (num < 0) this.wordsPerDay = 0;
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations({
			setShowSetting: 'APP_SHOW_SETTING',
			setSetting: 'user/USER_SETTINGS',
		}),
		...mapActions({
			setGetSetting: 'user/USER_GET_SET_SETTINGS',
		}),
		saveSetting() {
			this.setGetSetting({ method: 'put' });
			this.show = false;
		},
	},

};
</script>

<style lang='scss' scoped>

</style>
