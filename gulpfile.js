'use Strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    imagemin = require("gulp-imagemin"),

    inputCss = 'src/sass/**/*.scss',
    outputCss = 'src/css',
    inputImgs = 'src/img-dev/*',
    outputImgs = 'src/img';

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync({
        server: 'src'
    });

    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/*.js', ['reload']);
    gulp.watch(inputCss, ['sass']);
});

gulp.task('sass', function() {
    return gulp
        .src(inputCss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError(function(error) {
            return "Problem file : " + error.message;
        })))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(outputCss))
        .pipe(browserSync.stream());
});

gulp.task("images", function() {
    return gulp
        .src(inputImgs)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest(outputImgs));
});

gulp.task('default', ['serve']);
