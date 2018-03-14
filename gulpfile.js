var gulp = require('gulp');
var compass = require('gulp-compass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var debug = false;

gulp.task('html', function() {
    gulp.src('public/**/*.html')
        .pipe(livereload());
});

//配置compass，具体配置由config完成
gulp.task('compass', function() {
    var cParam = {
        config_file: './config.rb',
        css: 'public/css',
        sass: 'src/scss',
        image: '/imgs',
        font: '/font'
    };
    if (!debug) {
        cParam.image = 'LargeScreen/imgs';
        cParam.font = 'LargeScreen/font';
    }
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Gulp",
                subtitle: "compass编译错误!",
                message: "Error: <%= error.message %>",
                sound: "Beep"
            })
        }))
        .pipe(compass(cParam))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});

/*压缩js脚本文件*/
gulp.task('controllerJs', function() {
    if (!debug) {
        return gulp.src('src/js/controllers/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "controllerJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('controller.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    } else {
        return gulp.src('src/js/controllers/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "controllerJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(concat('controller.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    }

});

gulp.task('directiveJs', function() {
    if (!debug) {
        return gulp.src('src/js/directives/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "directiveJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('directive.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    } else {
        return gulp.src('src/js/directives/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "directiveJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(concat('directive.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    }
});

gulp.task('serviceJs', function() {
    if (!debug) {
        return gulp.src('src/js/services/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "serviceJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('service.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    } else {
        return gulp.src('src/js/services/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "serviceJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(concat('service.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    }
});

gulp.task('appJs', function() {
    if (!debug) {
        return gulp.src('src/js/app/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "appJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('app.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    }else {
        return gulp.src('src/js/app/*.js')
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Gulp",
                    subtitle: "appJs模块编译错误!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })
            }))
            .pipe(concat('app.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('public/js'))
            .pipe(livereload());
    }
});

/*图片压缩*/
gulp.task('images', function() {
    return gulp.src('src/imgs/**/*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('public/imgs'))
        .pipe(notify({
            message: '图片压缩完成'
        }));
});

/*清理压缩文件*/
gulp.task('clean', function() {
    return gulp.src(['public/css', 'public/js', 'public/imgs'], {
            read: false
        })
        .pipe(clean());
});

/*预设任务*/
gulp.task('default', ['clean'], function() {
    gulp.start('compass', 'appJs', 'controllerJs', 'directiveJs', 'serviceJs'
        // , 'images'
    );
});

/*监控文件变化*/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/**/*.html', ['html']);
    gulp.watch('src/scss/**/*', ['compass']);
    gulp.watch('src/js/app/*.js', ['appJs']);
    gulp.watch('src/js/controllers/*.js', ['controllerJs']);
    gulp.watch('src/js/directives/*.js', ['directiveJs']);
    gulp.watch('src/js/services/*.js', ['serviceJs']);
    // gulp.watch('src/img/**/*', ['images']);
});