<template lang='pug'>
	v-card( justify="center" )
		v-card-title
			span( class="headline" ) Login
		v-card-text
			v-container
				v-row
				v-col( cols="12" )
					v-text-field( label="Email*" v-model="email" required )

				v-col( cols="12" )
					v-text-field( label="Password*" v-model="password" type="password" required)
			small *indicates required field
		v-card-actions
			v-spacer
			v-btn( color="blue darken-1" text @click="auth" ) Send
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'HelloWorld',
	components: {},
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
			auth: 'AUTH_REQUEST',
		}),
	},

};
</script>
