const path = require('path');

const Timestamp = new Date().getTime();
module.exports = {
	//baseUrl:"./",
	publicPath: './',
	outputDir: "dist",
	//assetsDir:"assets",
	indexPath: "index.html",
	filenameHashing: true,
	pages: undefined,
	lintOnSave: true,
	runtimeCompiler: false,
	transpileDependencies: [],
	productionSourceMap: false,
	crossorigin: undefined,
	integrity: false,
	chainWebpack(config) {
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')
		// (1.) To handle editor icons, get the default rule for *.svg files first:
		const svgRule = config.module.rule('svg');
		// Then you can either:
		//
		// * clear all loaders for existing 'svg' rule:
		//
		//      svgRule.uses.clear();
		//
		// * or exclude ckeditor directory from node_modules:
		svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
		// Add an entry for *.svg files belonging to CKEditor. You can either:
		//
		// * modify the existing 'svg' rule:
		//
		//      svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
		//
		// * or add a new one:

	},

	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production'
			// 将每个依赖包打包成单独的js文件
			let optimization = {
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'all',
					maxInitialRequests: Infinity,
					minSize: 20000, // 依赖包超过20000bit将被单独打包
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name(module) {
								// get the name. E.g. node_modules/packageName/not/this/part.js
								// or node_modules/packageName
								const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
								// npm package names are URL-safe, but some servers don't like @ symbols
								return `npm.${packageName.replace('@', '')}`
							}
						}
					}
				}
			}
			Object.assign(config, {
				optimization
			})
		} else {
			// 为开发环境修改配置...
			config.mode = 'development'
		}
		config.output.filename = `js/[name].js?${Timestamp}`
		config.output.chunkFilename = `js/[name].js?${Timestamp}`
	},

	devServer: { //代理
		port: 8080,
		proxy: {
			'/services/': {
				target: 'target',
				changeOrigin: true,
				//ws: true,
				// pathRewrite: {
				//   '^/services/': ''
				// }
			},
		}
	}
}