import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import imagemin from "gulp-imagemin";
import gulpif from "gulp-if";

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка IMAGE
const img = () => {
    return gulp.src(path.img.src) 
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "IMAGE",
            message: error.message
        }))
    }))
    .pipe(gp.newer(path.img.dest))
    .pipe(gp.webp())
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulp.src(path.img.src))
    .pipe(gp.newer(path.img.dest))
    .pipe(gulpif(app.isProd,imagemin(app.imagemin)))
    .pipe(gulp.dest(path.img.dest));
}

export default img;