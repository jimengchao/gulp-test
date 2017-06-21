const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

let AUTOPREFIXER_BROWSERS = ["Android >= 4", "Explorer >= 6", "iOS >= 6"];

//  压缩js
gulp.task('minifyjs',() => {
    gulp.src('./src/js/*.js')
    	.pipe($.sourcemaps.init())
    	.pipe($.babel())
    	.pipe($.uglify())
    	.pipe($.sourcemaps.write('./'))
    	.pipe(gulp.dest('./dist/js'))
    	.pipe(browserSync.stream())
});


// 编译压缩 scss
gulp.task('scss', () => {
	gulp.src('./src/scss/*.scss')
		//  添加 sourcemap
		.pipe($.sourcemaps.init())
		.pipe(sass())
		// 自动添加浏览器 前缀
		.pipe($.autoprefixer({
			 browsers: AUTOPREFIXER_BROWSERS,
			 cascade: false,
			 remove: true
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream())
})

// 创建本地server
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
    watchTask()
    gulp.watch("./*.html").on('change', browserSync.reload);
})

function watchTask(){
	gulp.watch('./src/scss/*.scss', ['scss']);
	gulp.watch('./src/js/*.js',['minifyjs']);
}

// 监听任务 
gulp.task('watch',()=>{
	watchTask()
})


gulp.task('default', ['watch'])