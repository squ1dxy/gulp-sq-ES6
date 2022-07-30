import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import webpack from "webpack-stream";

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка JavaScript
const js = () => {
    return gulp.src(path.js.src, {sourcemaps: app.isDev}) 
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "JavaScript",
            message: error.message
        }))
    }))
    .pipe(gp.babel())
    .pipe(webpack(app.webpack))
    .pipe(gulp.dest(path.js.dest, {sourcemaps: app.isDev}))
}

export default js;