import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка CSS
const css = () => {
    return gulp.src(path.css.src, {sourcemaps: app.isDev}) 
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "CSS",
            message: error.message
        }))
    }))
    .pipe(gp.concat("main.css"))
    .pipe(gp.cssimport())
    .pipe(gp.autoprefixer())
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(gp.size({title:"main.css"}))
    .pipe(gulp.dest(path.css.dest, {sourcemaps: app.isDev}))
    .pipe(gp.rename({suffix:".min"}))
    .pipe(gp.csso())
    .pipe(gp.size({title:"main.min.css"}))
    .pipe(gulp.dest(path.css.dest, {sourcemaps: app.isDev}))
}

export default css;