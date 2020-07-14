import { mapMutations, mapGetters } from 'vuex';

const alert = {
	computed: {
		...mapGetters({
			getAlert: 'showAlert',
		}),
		showAlert: {
			get() {
				return this.getAlert;
			},
			set() {
				this.offAlert();
			},
		},
	},
	methods: {
		...mapMutations({
			offAlert: 'SHOW_ALERT',
		}),
	},
};

export default alert;
