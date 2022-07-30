import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import htmlmin from "gulp-htmlmin";

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка HTML
const html = () => {
    return gulp.src(path.html.src)
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "HTML",
            message: error.message
        }))
    }))
    .pipe(gp.fileInclude())
    .pipe(gp.webpHtml())
    .pipe(gp.size({ title: "До сжатия"}))
    .pipe(htmlmin(app.htmlmin))
    .pipe(gp.size({ title: "После сжатия"}))
    .pipe(gulp.dest(path.html.dest))
}

export default html;