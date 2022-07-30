import gulp from "gulp";

//Configuration
import path from "../config/path.js";
import app from "../config/app.js";

//Plugins
import sassSecond from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( sassSecond );

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка SCSS
const scss = () => {
    return gulp.src(path.scss.src, {sourcemaps: app.isDev}) 
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "SCSS",
            message: error.message
        }))
    }))
    .pipe(gp.sassGlob())
    .pipe(sass())
    .pipe(gp.webpCss())
    .pipe(gp.autoprefixer())
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(gp.size({title:"main.css"}))
    .pipe(gulp.dest(path.css.dest, {sourcemaps: app.isDev}))
    .pipe(gp.rename({suffix:".min"}))
    .pipe(gp.csso())
    .pipe(gp.size({title:"main.min.css"}))
    .pipe(gulp.dest(path.scss.dest, {sourcemaps: app.isDev}))
}

export default scss;