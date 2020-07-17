<template>
	<div class="text-center ma-2">
		<v-btn id="btn_rules" @click="snackbar = true">Open rules of the game</v-btn>
		<v-snackbar v-model="snackbar" :timeout="timeout" color="blue darken-2">
			{{ text }}

			<template v-slot:action="{ attrs }">
				<v-btn id="btn_close"  text v-bind="attrs" @click="snackbar = false">
					Х
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
		text: 'Чтобы играть в эту прекрасную игру, нужно включить микрофон и имитировать диалог. Вы слушаете, то что произносит девушка на видео и отвечаете. Потом игра показывает, что вы произнесли. Предложение за предложением Вы отрабатываете своё произношение, желаем удачи!',
	}),
};
</script>

<style>
	#btn_rules {
		background: #1976d2;
		color: white;
		width: 220px;
		height: 60px;
		top: 10px;
	}
	#btn_close {
		color: red;
		position: relative;
		top: -20px;
		left: 10px;
	}
	#hint {
		position: absolute;
		color: #1976d2;
		width: 40%;
		left: 30%;
		top: -80%;
	}
</style>
