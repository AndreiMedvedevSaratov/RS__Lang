<template>
	<div class="text-center ma-2">
		<!-- <v-btn dark @click="snackbar = true">Open Snackbar</v-btn> -->
		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ text }}

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	data: () => ({
		snackbar: true,
		timeout: 30000,
		text:
			'Для того чтобы играть в эту игру нужен IQ>110 баллов. Тест на IQ: вам понятно как в играть в эту прекрасную игру? если да: поздравляю, вы умный и можете играть, если нет: поиграйте в друге наши игры -> это увеличит ваш IQ и возвращайтесь поиграть в speaking. Best of luck!!!',
	}),
};
</script>
