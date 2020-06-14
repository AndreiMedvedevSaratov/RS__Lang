<template lang='pug'>
  v-app
    div( class="ma-auto custom" )
      router-link( to="/about" ) Go to About
      v-spacer
      router-link( to="/" ) Go to Home

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
