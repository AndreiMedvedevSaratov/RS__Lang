<template lang='pug'>
	v-app
		alert
		transition
			router-view
</template>

<script>

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
