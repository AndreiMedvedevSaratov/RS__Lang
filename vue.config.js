module.exports = {
	configureWebpack: {
		devtool: 'source-map',
	},
	publicPath: './',
	assetsDir: 'assets',
	productionSourceMap: false,
	css: {
		extract: false,
	},

	transpileDependencies: [
		'vuetify',
	],
};
