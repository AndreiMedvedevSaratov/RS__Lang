<template lang='pug'>
	div
		v-dialog(
			v-model="closeAlert"
			:class="getError.status+' text-white'"
			max-width="290"
			transition="scale-transition"
		)
			v-card
				v-card-text( v-html="errMessage" )

</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'alert',
	components: {},
	props: {},
	data: () => ({
	}),
	computed: {
		...mapGetters(['getError']),
		closeAlert: {
			get() {
				return this.getError.alert;
			},
			set(value) {
				this.alert(value);
			},
		},
		errMessage: {
			get() {
				return this.getError.massage;
			},
		},
	},
	watch: {},
	created() {},
	mounted() {
	},
	updated() {
		console.log(this.getError);
	},
	methods: {
		...mapMutations({
			alert: 'ERROR_ALERT',
		}),
	},

};
</script>

<style lang='scss' scoped>
.alert-absolute {
	position: absolute!important;
	width: 100%;
}
</style>
