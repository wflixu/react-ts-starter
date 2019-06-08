const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
           {
               test: /\.tsx?$/,
               use:'ts-loader',
               exclude:/node_modules/,
           }
        ]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    devServer:{
       contentBase: path.resolve(__dirname,'dist'),
       compress:true,
       open:true,
       port:9000
    },
    resolve:{
        extensions:['.tsx','.ts','.js']
    }
}