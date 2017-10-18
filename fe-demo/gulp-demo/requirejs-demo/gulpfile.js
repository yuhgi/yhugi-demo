var gulp = require('gulp');
//var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');

gulp.task('default',['test','eslint','rjs'],function(){
    
});

// 进行ava单元测试
gulp.task('test',function(){

});

// 测试代码覆盖率检查
gulp.task('coverrate',function(){

});

// 使用eslint进行代码检查
gulp.task('eslint',function(){

});

// 使用r.js合并requirejs模块
gulp.task('rjs',function(){
    return gulp.src("./src/js/**/*.js")
        .pipe(concat({path:'new.js'}))
        .pipe(gulp.dest('./dist'));
});

// 合并css文件
gulp.task('css',function(){

});

// 图片处理
gulp.task('image',function(){

});

// 复制html文件
gulp.task('html',function(){

});