const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprites');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const plumber      = require("gulp-plumber");
const notify       = require("gulp-notify")

// styles 
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// scripts
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')

const paths = {
  root: './docs',
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'docs/assets/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'docs/assets/scripts/'
  },
  templates: {
    src: 'src/templates/',
    dest: 'docs/assets/'
  },
  images: {
    src: 'src/images/**/*.{jpg,svg,png}',
    dest: 'docs/assets/images/'
  },
  videos: {
    src: 'src/videos/**/*.{mp4,webm}',
    dest: 'docs/assets/videos/'
  },
  icons: {
    src: 'src/images/icons/*.svg',
    dest: 'src/images/icons/'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'docs/assets/fonts/'
  }
};

// pug
function html() {
  return gulp.src(paths.templates.src + "pages/*.pug")
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {title: "Style", message: err.message}
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
  return gulp.src('./src/styles/app.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {title: "Style", message: err.message}
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

// перенос картинок
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// перенос видео
function videos() {
  return gulp.src(paths.videos.src)
    .pipe(gulp.dest(paths.videos.dest));
}

// перенос шрифтов
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// webpack
function scripts() {
  return gulp.src('src/scripts/app.js')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {title: "javaScript", message: err.message}
      })
    }))
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

// очистка папки docs
function clean() {
  return del(paths.root);
}

// следим за src и запускаем нужные таски (компиляция и пр.)
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, html);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.videos.src, videos);
  gulp.watch(paths.fonts.src, fonts);
}

// следим за docs и релоадим браузер
function server() {
  browserSync.init({
    server: paths.root,
    reloadDelay: 200
  });
  browserSync.watch(paths.root + '/**/*.{html,css}', browserSync.reload);
}

// svg спрайт
function sprite() {
  return gulp.src(paths.icons.src)
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: "symbols",
      svg: {
        symbols: 'sprite.svg'
      }
    }))
    .pipe(gulp.dest(paths.icons.dest));
}

// экспорт функций для доступа из терминала
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.videos = videos;
exports.watch = watch;
exports.server = server;
exports.fonts = fonts;
exports.sprite = sprite;

// сборка и слежка
gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, html, images, videos, fonts),
  gulp.parallel(watch, server)
));