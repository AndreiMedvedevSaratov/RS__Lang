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
					span( class="headline" ) Login
					router-link(to="/signup")
						v-btn( depressed small ) or Register
				v-card-text
					v-container
						v-col( cols="12" )
							v-text-field(
								label="Email*"
								v-model="email"
								:rules="emailRules"
								@keyup.enter="isAuth"
								required )

						v-col( cols="12" )
							v-text-field(
								label="Password*"
								v-model="password"
								:rules="passRules"
								@keyup.enter="isAuth"
								type="password"
								required )
					small *indicates required field
				v-card-actions
					v-spacer
					v-btn(
						color="blue darken-1"
						text @click="isAuth"
						:disabled="!valid"
						) Sign in
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Login',
	computed: {
		...mapGetters(['user/getProfile', 'isLoading']),
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
	methods: {
		...mapMutations({
			setProfile: 'user/USER_FORM',
		}),
		...mapActions({
			authAction: 'AUTH_REQUEST',
		}),
		auth() {
			this.authAction().then(() => {
				this.$router.push('/').catch(() => {});
			});
		},
		isAuth() {
			return this.valid ? this.auth() : '';
		},
	},

};
</script>
