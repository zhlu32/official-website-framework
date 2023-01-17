var config = {
    src: './src/',
    dist: './.dist/',
    tmp: './.tmp/',
    rev: './.tmp/rev/',

    js: 'js/**/*.js',
    css: 'css/**/*.css',
    sass: 'css/**/*.scss',
    mock: 'mock/**/*.json',
    html: '**/*.html',

    jsPath: 'js/',
    cssPath: 'css/',
    imgPath: 'img/',
    mockPath: 'mock/'
};

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var revdel = require('gulp-rev-delete-original');
var sass = require('gulp-sass')(require('sass'));

/** Start local-service-middleware **/
// var proxyMiddleware = require('http-proxy-middleware');
/** Get cmd's argv **/
// var argv = require('yargs').argv;

var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var fileinclude = require('gulp-file-include');

/** Delete tmp dir and dist dir **/
gulp.task('clean', async function () {
    return del.sync([config.dist, config.tmp]);
});

/** Copy src to tmp dir **/
gulp.task('src2tmp', function () {
    console.log('Task----->: Copy src to tmp dir');
    return gulp.src(config.src + "**").pipe(gulp.dest(config.tmp));
});
/** In tmp dir, exec fileinclude **/
gulp.task('fileinclude', function () {
    console.log('Task----->: In tmp dir, exec fileinclude');
    return gulp.src(config.tmp + config.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        })).pipe(gulp.dest(config.tmp));
});
/** In tmp dir, exec sass **/
gulp.task('sass', function () {
    console.log('Task----->: In tmp dir, exec sass');
    return gulp.src(config.tmp + config.sass)
        .pipe(sass()).pipe(gulp.dest(config.tmp+ config.cssPath));
});
/** In tmp dir, delete sass files **/
gulp.task('dele-sass', async function () {
    console.log('Task----->: In tmp dir, delete sass files');
    return del.sync([config.tmp + config.sass]);
});
gulp.task('init-task', gulp.series('src2tmp', 'fileinclude', 'sass', 'dele-sass'))

/** Copy tmp to dest dir **/
gulp.task('tmp2dest', function () {
    console.log('Task----->: Copy tmp to dest dir');
    return gulp.src(config.tmp + "**").pipe(gulp.dest(config.dist));
});

/** In tmp/img dir, append hashId to Img's name **/
gulp.task('img', function () {
    console.log('Task----->: In tmp/img dir, append hashId to img name');
    return gulp.src(config.tmp + config.imgPath + '**')
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest(config.tmp + config.imgPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev + 'img'));
});

/** In tmp/mock dir, replace name(ex: Img) with hashId in all json file **/
gulp.task('mock-replace-img', function () {
    console.log('Task----->: In tmp/mock dir, replace name(ex: Img) with hashId in all json file');
    return gulp.src([config.rev + '/**/*.json', config.tmp + config.mock])
        .pipe(revCollector())
        .pipe(gulp.dest(config.tmp + config.mockPath));
});
/** In tmp/mock dir, append hashId to json's name **/
gulp.task('mock-rev', function () {
    console.log('Task----->: In tmp/mock dir, append hashId to jsons name');
    return gulp.src(config.tmp + config.mock)
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest(config.tmp + config.mockPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev + 'mock'));
});
gulp.task('mock', gulp.series('mock-replace-img', 'mock-rev'));

/** In tmp/css dir, replace name(ex: Img) with hashId in all css file **/
gulp.task('css-replace-img', function () {
    console.log('Task----->: In tmp/css dir, replace name(ex: Img) with hashId in all css file');
    return gulp.src([config.rev + '/**/*.json', config.tmp + config.css])
        .pipe(revCollector()).pipe(gulp.dest(config.tmp + config.cssPath));
});
/** In tmp/css dir, compress css file then append hashId to css's name **/
gulp.task('css-rev', function () {
    console.log('Task----->: In tmp/css dir, compress css file then append hashId to css name');
    return gulp.src(config.tmp + config.css)
        .pipe(cssnano({"safe": true}))
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest(config.tmp + config.cssPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev + 'css'));
});
gulp.task('css', gulp.series('css-replace-img', 'css-rev'));

/** In tmp/js dir, replace name(ex: Img, Json) with hashId in all js file **/
gulp.task('js-replace-mock', function () {
    console.log('Task----->: In tmp/js dir, replace name(ex: Img, Json) with hashId in all js file');
    return gulp.src([config.rev + '/**/*.json', config.tmp + config.js])
        .pipe(revCollector()).pipe(gulp.dest(config.tmp + config.jsPath));
});
/** In tmp/js dir, compress js file then append hashId to js's name **/
gulp.task('js-rev', function () {
    console.log('Task----->: In tmp/js dir, compress js file then append hashId to js name');
    return gulp.src(config.tmp + config.js)
        .pipe(uglify())
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest(config.tmp + config.jsPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev + 'js'));
});
gulp.task('js', gulp.series('js-replace-mock', 'js-rev'));

/** In tmp dir, replace name(ex: Img, Json, Css) with hashId in all html file **/
gulp.task('html-replace-jscss', function () {
    console.log('Task----->: In tmp dir, replace name(ex: Img, Json, Css) with hashId in all html file');
    return gulp.src([config.rev + '/**/*.json', config.tmp + config.html])
        .pipe(revCollector())
        .pipe(gulp.dest(config.tmp));  
});
gulp.task('html', gulp.series('html-replace-jscss'));

/** hot deply in dev **/
gulp.task('reload', function (done) {
    console.log('Task----->: browser reload......');
    browserSync.reload();
    done();
});

gulp.task('browserSync', function () {
    browserSync.init({
        injectChanges: false,
        server: {
            baseDir: config.dist,
            // index: "index.html",
            //middleware: [
                // proxyMiddleware('/1.0', target)
            //]
        }
    });
});

gulp.task('watchAll', function () {
    gulp.watch([config.src + config.html, config.src + config.css, config.src + config.sass, config.src + config.js, config.src + config.mock], gulp.series('init-task', 'tmp2dest', 'reload'));
    // gulp.watch([config.dist + config.html, config.dist + config.css, config.dist + config.js, config.dist + config.mock], gulp.series('reload'));
});


/** gulp command **/
gulp.task('dev', gulp.series('clean', 'init-task', 'img', 'mock', 'css', 'js', 'html', 'tmp2dest', gulp.parallel('watchAll', 'browserSync')));
gulp.task('publish', gulp.series('clean', 'init-task', 'img', 'mock', 'css', 'js', 'html', 'tmp2dest'));

