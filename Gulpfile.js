// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var less   = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  gulp.src('./mm-app/pixie/assets/less/main.less')
  	//.pipe(sourcemaps.init())
    .pipe(less())
    
   	.pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false,
         remove: false,
    }))
    //.pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./mm-app/pixie/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('integrate-less', function () {
    gulp.src('./mm-app/pixie/assets/less/integrate.less')
        .pipe(less())
        .on('error', function (err) {
            this.emit('end');
        })
        .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false,
             remove: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./mm-app/pixie/assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'mm-app/pixie/assets/js/editor/resources/colors.js',
        'mm-app/pixie/assets/js/editor/resources/gradients.js',
    	'mm-app/pixie/assets/js/vendor/jquery.js',
        'mm-app/pixie/assets/js/vendor/jquery-ui.js',
        'mm-app/pixie/assets/js/vendor/file-saver.js',
        'mm-app/pixie/assets/js/vendor/pagination.js',
        'mm-app/pixie/assets/js/vendor/spectrum.js',
        'mm-app/pixie/assets/js/vendor/hammer.js',
        'mm-app/pixie/assets/js/vendor/scrollbar.js',
    	'mm-app/pixie/assets/js/vendor/angular.min.js',
        'mm-app/pixie/assets/js/vendor/angular-animate.js',
        'mm-app/pixie/assets/js/vendor/angular-aria.js',
        'mm-app/pixie/assets/js/vendor/angular-material.js',
        'mm-app/pixie/assets/js/vendor/angular-sortable.js',
    	'mm-app/pixie/assets/js/vendor/fabric.js',
    	'mm-app/pixie/assets/js/editor/App.js',
        'mm-app/pixie/assets/js/editor/LocalStorage.js',
        'mm-app/pixie/assets/js/editor/Settings.js',
        'mm-app/pixie/assets/js/editor/Keybinds.js',
        'mm-app/pixie/assets/js/editor/Canvas.js',
        'mm-app/pixie/assets/js/editor/crop/cropper.js',
        'mm-app/pixie/assets/js/editor/crop/cropzone.js',
        'mm-app/pixie/assets/js/editor/crop/cropController.js',
        'mm-app/pixie/assets/js/editor/basics/RotateController.js',
        'mm-app/pixie/assets/js/editor/basics/CanvasBackgroundController.js',
        'mm-app/pixie/assets/js/editor/basics/ResizeController.js',
        'mm-app/pixie/assets/js/editor/basics/RoundedCornersController.js',
        'mm-app/pixie/assets/js/editor/zoomController.js',
        //'mm-app/pixie/assets/js/editor/TopPanelController.js',
        'mm-app/pixie/assets/js/editor/TopPanelController.MODIFIED.js',
        'mm-app/pixie/assets/js/editor/directives/Tabs.js',
        'mm-app/pixie/assets/js/editor/directives/PrettyScrollbar.js',
        'mm-app/pixie/assets/js/editor/directives/ColorPicker.js',
        'mm-app/pixie/assets/js/editor/directives/FileUploader.js',
        'mm-app/pixie/assets/js/editor/directives/TogglePanelVisibility.js',
        'mm-app/pixie/assets/js/editor/directives/ToggleSidebar.js',
        'mm-app/pixie/assets/js/editor/text/Text.js',
        'mm-app/pixie/assets/js/editor/text/TextController.js',
        'mm-app/pixie/assets/js/editor/text/TextAlignButtons.js',
        'mm-app/pixie/assets/js/editor/text/TextDecorationButtons.js',
        'mm-app/pixie/assets/js/editor/text/Fonts.js',
        'mm-app/pixie/assets/js/editor/drawing/Drawing.js',
        'mm-app/pixie/assets/js/editor/drawing/DrawingController.js',
        'mm-app/pixie/assets/js/editor/drawing/RenderBrushesDirective.js',
        'mm-app/pixie/assets/js/editor/History.js',
        //'mm-app/pixie/assets/js/editor/Saver.js',
        'mm-app/pixie/assets/js/editor/Saver.MODIFIED.js',
        'mm-app/pixie/assets/js/editor/filters/FiltersController.js',
        'mm-app/pixie/assets/js/editor/filters/Filters.js',
        'mm-app/pixie/assets/js/editor/shapes/SimpleShapesController.js',
        'mm-app/pixie/assets/js/editor/shapes/StickersController.js',
        'mm-app/pixie/assets/js/editor/shapes/StickersCategories.js',
        'mm-app/pixie/assets/js/editor/shapes/SimpleShapes.js',
        'mm-app/pixie/assets/js/editor/shapes/Polygon.js',
        'mm-app/pixie/assets/js/editor/objects/ObjectsPanelController.js',
	])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('mm-app/pixie/assets/js')) 
    .pipe(browserSync.reload({stream:true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
	browserSync({
        proxy: "localhost/MediaManager/",
        //server: {
		 //   baseDir: "./"
        //}
    });

    gulp.watch('mm-app/pixie/assets/js/**/*.js', ['scripts']);
    gulp.watch('mm-app/pixie/assets/less/**/*.less', ['less']);
    gulp.watch('mm-app/pixie/assets/less/**/integrate.less', ['integrate-less']);
});

// Default Task
gulp.task('default', ['less', 'scripts', 'watch']);