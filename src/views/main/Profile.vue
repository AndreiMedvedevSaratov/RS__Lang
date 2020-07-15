/* eslint-disable no-undef */
<template>
  <v-card
    class="mx-auto"
    color="grey lighten-4"
    max-width="600"
  >
    <v-btn
      block
      outlined
      @click="refreshToken"
    >
      Обновить токен
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */

export default {
	name: 'Profile',
	methods: {
		...mapActions({
			refreshToken: 'AUTH_REFRESH_TOKEN',
		}),
	},

};
</script>
