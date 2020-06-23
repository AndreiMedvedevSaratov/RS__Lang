<template lang='pug'>
	v-row
		v-form( v-model="valid" class="ma-auto width-form-login-singup" )
			v-card(
			justify="center"
			elevation="5"
			)
				v-overlay( :value="isLoading" :absolute="true" )
					v-progress-circular( indeterminate size="64" )
				v-card-title
					span( class="headline" ) Signup
					router-link(to="/login")
						v-btn( depressed small ) or Login
				v-card-text
					v-container
						v-col( cols="12" )
							v-text-field(
								label="Email*"
								v-model="email"
								:rules="emailRules"
								@keyup.enter="isSignup"
								required )

						v-col( cols="12" )
							v-text-field(
								label="Password*"
								v-model="password"
								type="password"
								:rules="passRules"
								@keyup.enter="isSignup"
								required)
					small *indicates required field
				v-card-actions
					v-spacer
					v-btn( color="blue darken-1" text @click="isSignup" :disabled="!valid" ) Register
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Signup',
	components: {
	},
	props: [],
	data: () => ({
		valid: false,
		passRules: [
			(v) => !!v || 'Password is required',
			(v) => /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/.test(v)
			|| 'The password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one digit, and one special character from + -_@$!%*?&#.,;:[]{}',
		],
		emailRules: [
			(v) => !!v || 'E-mail is required',
			(v) => /.+@.+/.test(v) || 'E-mail must be valid',
		],
	}),
	computed: {
		...mapGetters(['user/getProfile']),
		...mapGetters({
			isLoading: 'user/isLoading',
		}),
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
		isSignup() {
			return this.valid ? this.signup() : '';
		},
	},
};
</script>
