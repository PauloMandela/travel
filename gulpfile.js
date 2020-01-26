const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const purgecss = require('gulp-purgecss')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const minify = require('gulp-uglify')

function imgmin() {
    return src('src/media/img/*.*')
        .pipe(imagemin())
        .pipe(dest('hhgm/static/img'))
}

function compress() {
    return src(['src/media/js/*.js'])
        .pipe(minify())
        .pipe(dest('hhgm/static/js'))
}

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('hhgm/templates'))
}

function scss() {
    return src('src/sass/*.scss')
        .pipe(sass())
        // .pipe(purgecss({
        //     content: ['src/**/*.html']
        // }))
        .pipe(autoprefixer({}))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('hhgm/static/css'))
}

function justcss() {
    return src('src/media/*.css')
        .pipe(dest('hhgm/static/css'))
}

function fonts() {
    return src('src/media/fonts/*.*')
        .pipe(dest('hhgm/static/fonts'))
}

function clear() {
    return del('hhgm')
}

function serve() {
    sync.init({
        server: './hhgm',
    })

    watch('src/*/**.html', series(html)).on('change', sync.reload)
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/media/*/**.js', series(compress)).on('change', sync.reload)
    watch('src/media/**.css', series(justcss)).on('change', sync.reload)
    watch('src/sass/**.scss', series(scss)).on('change', sync.reload)
}
exports.build = series(clear, scss, fonts, justcss, compress, html)
exports.clear = clear
exports.serve = series(clear, imgmin, fonts, scss, justcss, compress, html, serve)