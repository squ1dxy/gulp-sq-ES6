import gulp from "gulp";

//Configuration
import path from "../config/path.js";
import app from "../config/app.js";

//Plugins connect
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка Pug
const pugs = () => {
    return gulp.src(path.pug.src)
    .pipe(gp.plumber({
        errorHandler: gp.notify.onError(error => ({
            title : "Pug",
            message: error.message
        }))
    }))
    .pipe(gp.pug(app.pug))
    .pipe(gp.webpHtml())
    .pipe(gulp.dest(path.pug.dest))
}

export default pugs;