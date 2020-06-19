<template lang='pug'>
	v-row
		v-card(
			justify="center"
			class="ma-auto"
			elevation="5"
			)
			v-card-title
				span( class="headline" ) Signup
				router-link(to="/login")
					v-btn( depressed small ) or Login
			v-card-text
				v-container
					v-col( cols="12" )
						v-text-field( label="Email*" v-model="email" required )

					v-col( cols="12" )
						v-text-field( label="Password*" v-model="password" type="password" required)
				small *indicates required field
			v-card-actions
				v-spacer
				v-btn( color="blue darken-1" text @click="signup" ) Register
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'HelloWorld',
	components: {
	},
	props: [],
	data: () => ({

	}),
	computed: {
		...mapGetters(['user/getProfile']),
		email: {
			get() {
				return this['user/getProfile'].email;
			},
			set(value) {
				this.setProfile({
					key: 'email',
					value,
				});
			},
		},
		password: {
			get() {
				return this['user/getProfile'].password;
			},
			set(value) {
				this.setProfile({
					key: 'password',
					value,
				});
			},
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapMutations({
			setProfile: 'user/USER_FORM',
		}),
		...mapActions({
			signup: 'user/USER_SIGNUP',
		}),
	},
};
</script>
