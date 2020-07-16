<template lang="pug">
	canvas(
		id='graph'
		width="500"
		height="300"
	)
</template>

<script>
// :width="graphWidth"
// :height="graphHeight"
export default {
	name: 'StatGraph',
	components: {},
	directives: {},
	mixins: [],
	props: {
		statistics: {
			type: Array,
			required: true,
		},
		graphWidth: {
			type: Number,
			default: 500,
		},
		graphHeight: {
			type: Number,
			default: 300,
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.createGraph(this.statistics);
	},
	beforeUpdate() {
		this.createGraph(this.statistics);
	},
	updated() {},
	methods: {
		createGraph(statData) {
			const xPadding = 30;
			const yPadding = 30;
			const graph = document.getElementById('graph');

			// Returns the max words value in our data list
			function getMaxWords(arr) {
				let max = 0;

				for (let i = 0; i < arr.length; i += 1) {
					if (arr[i].words > max) {
						max = arr[i].words;
					}
				}

				max += 10 - (max % 10);
				return max;
			}

			function getLastWeek(arr) {
				return arr.slice(-7);
				// const today = new Date().toJSON().replace(/T.+/, '');
				// console.log(today);
			}

			// Return the x pixel for a graph point
			function getXPixel(arr, val) {
				return ((graph.width - xPadding) / arr.length) * val + xPadding * 1.25;
			}

			// Return the y pixel for a graph point
			function getYPixel(arr, val) {
				return graph.height - ((graph.height - yPadding) / getMaxWords(arr)) * val - yPadding;
			}

			const c = graph.getContext('2d');
			const data = getLastWeek(statData);

			// basic params
			c.lineWidth = 2;
			c.strokeStyle = '#333';
			c.font = 'italic 8pt sans-serif';
			c.textAlign = 'center';

			// Draw the axises
			c.beginPath();
			c.moveTo(xPadding, 0);
			c.lineTo(xPadding, graph.height - yPadding);
			c.lineTo(graph.width, graph.height - yPadding);
			c.stroke();

			// Draw the X value texts
			for (let i = 0; i < data.length; i += 1) {
				// uses data.X
				c.fillText(data[i].date.slice(-2), getXPixel(data, i), graph.height - yPadding + 20);
			}

			// Draw the Y value texts
			c.textAlign = 'right';
			c.textBaseline = 'middle';

			for (let i = 0; i < getMaxWords(data); i += 10) {
				c.fillText(i, xPadding - 10, getYPixel(data, i));
			}
			c.strokeStyle = '#f00';

			// eslint-disable-next-line no-use-before-define
			drawLine('words', '#f00');
			// eslint-disable-next-line no-use-before-define
			drawLine('successWord', '#00ffffff');
			function drawLine(field, color) {
				// Draw the line graph
				c.beginPath();
				c.strokeStyle = color;
				c.moveTo(getXPixel(data, 0), getYPixel(data, data[0][field]));
				for (let i = 1; i < data.length; i += 1) {
					c.lineTo(getXPixel(data, i), getYPixel(data, data[i][field]));
				}
				c.stroke();

				// Draw the dots
				c.fillStyle = '#333';

				for (let i = 0; i < data.length; i += 1) {
					c.beginPath();
					c.arc(getXPixel(data, i), getYPixel(data, data[i][field]), 4, 0, Math.PI * 2, true);
					c.fill();
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
// #graph {
// 	width: 500px;
// 	height: 300px;
// }

// @media (max-width: 1440px) {
// 	#graph {
// 		width: 500px;
// 		height: 300px;
// 	}
// }
// @media (max-width: 1020px) {
// 	#graph {
// 		width: 780px;
// 	}
// }
// @media (max-width: 780px) {
// 	#graph {
// 		width: 320px;
// 	}
// }
// @media (max-width: 320px) {
// 	#graph {
// 		width: 300px;
// 	}
// }
</style>
