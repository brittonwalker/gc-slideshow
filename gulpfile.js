var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var gls = require('gulp-live-server');

gulp.task('styles', function() {
    gulp.src('./scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/'))
});

gulp.task('watch', function () {
	gulp.watch('./scss/**/*.scss',['styles']);
});

gulp.task('serve', function() {
 var server = gls.new('./app.js');
 server.start();

 //use gulp.watch to trigger server actions(notify, start or stop)
 gulp.watch(['./assets/*.css', './assets/*.js', './index.html'], function (file) {
   server.notify.apply(server, [file]);
 });
});

//Watch task
gulp.task('default', [ 'watch', 'serve' ]);
