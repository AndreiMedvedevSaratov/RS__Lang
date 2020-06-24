<template lang='pug'>
	v-app
		alert
		transition
			router-view( name='alert' )
			router-view
</template>

<script>
import alert from '@/components/alert.vue';

export default {
	name: 'App',

	components: {
		alert,
	},

	data: () => ({
		//
	}),
	computed: {
	},
	mounted() {
	},
	methods: {
	},
};
</script>
