module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module:{
  	loaders:[
  		{
  			test:/\.js[x]?$/,
  			exclude:/node_modules/,
  			loaders:'babel-loader?presets[]=es2015&presets[]=react'
  		},
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      }
  	]
  },
  resolve:{
  	alias:{
  		'vue$':'vue/dist/vue.common.js'
  	}
  }
}