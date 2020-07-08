<template lang='pug'>
	div
		v-dialog(
			v-model="dialog"
			v-if="words"
			scrollable
			max-width="500px"
		)
			v-card
				v-card-title {{ title }}
				v-divider
				v-card-text
					v-list(
						dense
						inactive
					)
						span( class="font-weight-medium" ) Ошибок
							=' '
							v-chip(
								color="error"
								small
								label
							) {{words.wrong.length}}
						v-list-item-group
							v-virtual-scroll(
								:items="words.wrong"
								:item-height="50"
								height="150"
							)
								template( v-slot="{ item }" )
									v-list-item()
										v-list-item-icon
											v-icon mdi-volume-high
										v-list-item-content
											v-list-item-title {{ item.word }}
												=' - '
												span( class="font-weight-light" ) {{ item.wordTranslate }}
						span( class="font-weight-medium" ) Правильных
							=' '
							v-chip(
								color="success"
								small
								label
							) {{words.correct.length}}
						v-list-item-group
							v-virtual-scroll(
								:items="words.correct"
								:item-height="50"
								height="150"
							)
								template( v-slot="{ item }" )
									v-list-item()
										v-list-item-icon
											v-icon mdi-volume-high
										v-list-item-content
											v-list-item-title {{ item.word }}
												=' - '
												span( class="font-weight-light" ) {{ item.wordTranslate }}
				v-divider

</template>

<script>
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Dialog',
	components: {},
	props: {
		dialog: {
			type: Boolean,
			default: false,
			required: true,
		},
		title: {
			type: String,
			default: 'Statistics',
		},
		words: {
			type: Object,
			required: true,
		},
	},
	data: () => ({

	}),
	computed: {
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},

};
</script>

<style lang='scss' scoped>

</style>
