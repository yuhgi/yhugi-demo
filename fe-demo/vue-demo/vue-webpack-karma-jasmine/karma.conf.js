var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
module.exports = function (config) {
    config.set({
        basePath: __dirname, // 所有相对路径的基路径
        frameworks: ['jasmine'],// 使用的测试框架
        files: [ // 测试文件匹配
            'test/unit/**/*.spec.js'
        ],
        exclude: [ // 被排除在外的文件
        ],
        preprocessors: { // 进行预处理
            'test/unit/**/*.spec.js':['webpack','sourcemap']
        },
        webpack:webpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        reporters: ['spec','coverage'],
        coverageReporter:{
            type:'html',
            dir:'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        autoWatchBatchDelay:500,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    });
};
