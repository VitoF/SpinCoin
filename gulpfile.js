var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] });
    minifycss = require('gulp-minify-css'),
    shell = require('gulp-shell'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    del = require('del'),
    swig = require('gulp-swig'),
    shell = require('gulp-shell'),
    imageop = require('gulp-image-optimization');;

	
/*******************************************************************************
	SOURCES AND RESULT PATHS
*******************************************************************************/
var paths = {
    result: {
        html: 'result/views',
        css: 'result/styles',
        js: 'result/scripts',
        img: 'result/images'
        },
    src: {
        html: 'src/views/*.html',
        htmlWithModules: 'src/views/**/*.html',
        css: 'src/styles/**/*.less',
        js: 'src/scripts/**',
        img: 'src/images/**'
        },
}

/*******************************************************************************
	OPTIMIZE IMAGES TASK
*******************************************************************************/
//gulp.task('opt_img', [], function() {
//    gulp.start('TTimagesOpt');
//	gulp.start('BEimagesOpt');
//	gulp.start('BRimagesOpt');
//});

/*******************************************************************************
	DEFAULT TASK
*******************************************************************************/
gulp.task('default', ['connect','clean'], function() {
    gulp.start('html');
    gulp.start('styles');
	gulp.start('scripts');
	gulp.start('images');
    gulp.watch(paths.src.htmlWithModules, ['html']);
    gulp.watch(paths.src.css, ['styles']);
    gulp.watch(paths.src.js, ['scripts']);
    gulp.watch(paths.src.img, ['images']);
});

gulp.task('clean', function(cb) {
    del([paths.result.html,
         paths.result.css,
         paths.result.js,
         paths.result.img,
        ], cb);
});


/*******************************************************************************
	STYLES
*******************************************************************************/
gulp.task('styles', function() {
   return gulp.src(paths.src.css)
	  .pipe(concat('style.css'))
      .pipe(less({
        plugins: [autoprefix]
      }))
      .pipe(gulp.dest(paths.result.css))
	  .pipe(minifycss())
	  .pipe(concat('style.min.css'))
	  .pipe(gulp.dest(paths.result.css));
});

/*******************************************************************************
	JS just copy all files to Result directory
*******************************************************************************/

gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
//    .pipe(jshint())
//    .pipe(jshint.reporter('default'))
//    .pipe(concat('main.js'))
//    .pipe(gulp.dest(tabletable.js))
//    .pipe(gulp.dest(brewers.js))
//    .pipe(gulp.dest(beefeater.js))
//    .pipe(rename({suffix: '.min'}))
//    .pipe(uglify())
    .pipe(gulp.dest(paths.result.js));
});

/*******************************************************************************
	HTML
*******************************************************************************/
gulp.task('html', function(){
    gulp.src(paths.src.html)
    .pipe(swig({
        data: {//here write all swig variables you need
            cssurl: '/styles/style.min.css',
            imgurl: '/images/',
            devimg: '/devimages/'
        },
        defaults: {
            cache: false
        }
    }))
    .pipe(gulp.dest(paths.result.html));
});

/*******************************************************************************
	WEB SERVER
*******************************************************************************/
gulp.task('connect', function() {
    connect.server({
        root: 'result',
        livereload: false,
        port: 2000
    });
});

/*******************************************************************************
	Copy IMAGES and FONTS
*******************************************************************************/
gulp.task('images', function() {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.result.img));
});
gulp.task('imagesOpt', function() {
  return gulp.src(paths.src.img)
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(paths.result.img));
});
