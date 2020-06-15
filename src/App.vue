<template lang='pug'>
	v-app
		div( class="mx-auto custom text-center" )
			router-link( to="/" )
				v-btn( class="mx-2" text large color="primary" ) Go to Home
			router-link( to="/about" )
				v-btn( class="mx-2" text large color="primary" ) Go to About
			router-link( to="/english-puzzle" )
				v-btn( class="mx-2" text large color="primary" ) English puzzle
			router-link( to="/speaking" )
				v-btn( class="mx-2" text large color="primary" ) Speaking
			router-link( to="/dictionary" )
				v-btn( class="mx-2" text large color="primary" ) Dictionary

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
};
</script>
