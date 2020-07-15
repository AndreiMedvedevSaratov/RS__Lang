import { mapMutations, mapGetters, mapActions } from 'vuex';

const setting = {
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
	methods: {
		...mapActions({
			setGetSetting: 'user/USER_GET_SET_SETTINGS',
		}),
		...mapMutations({
			setShowSetting: 'APP_SHOW_SETTING',
			setSetting: 'user/USER_SETTINGS',
		}),
	},
};

export default setting;
