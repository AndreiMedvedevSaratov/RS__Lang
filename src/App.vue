<template lang='pug'>
	v-app
		div( class="ma-auto custom text-center" )
			router-link( to="/" )
				v-btn( class="mx-2" text large color="primary" ) Home

			router-link(to="/about")
				v-btn( class="mx-2" text large color="primary" ) About

			router-link(to="/login")
				v-btn( class="mx-2" text large color="primary" ) Login

			transition
				router-view
</template>

<script>

export default {
	name: 'App',

	components: {},

	data: () => ({
		//
	}),
	mounted() {
		console.info(this);
	},
};
</script>
