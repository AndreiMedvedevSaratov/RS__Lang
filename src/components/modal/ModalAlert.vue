<template lang='pug'>
	div
		v-dialog( v-model="showAlert" persistent max-width="400" )
			v-card
				v-card-title( class="headline" ) {{ title }}
				v-card-text( v-html="text" )
				v-card-actions
					v-spacer
					v-btn( color="green darken-1" text @click="goHome()") Вернуться на главную
					v-btn( color="green darken-1" text @click="goYes()") Хорошо
</template>

<script>
import alert from '@/assets/js/mixinAlert';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'SprintModalShort',
	components: {},
	mixins: [alert],
	props: {
		title: {
			type: String,
			default: 'Предупреждение!',
		},
		text: {
			type: String,
			required: true,
		},
		goYes: {
			type: Function,
			required: true,
			default: () => console.log('Нет активной функции для кнопки подтверждения'),
		},
	},
	methods: {
		goHome() {
			this.showAlert = false;
			this.$router.push('/').catch(() => {});
		},
	},

};
</script>
