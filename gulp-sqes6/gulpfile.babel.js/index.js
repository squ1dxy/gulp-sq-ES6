import gulp from "gulp";
import browserSync from "browser-sync";

//Configuration
import path from "./config/path.js";
import app from "./config/app.js";

// Задачи
import clear from './tasks/clear.js';
import pug from './tasks/pug.js';
import scss from './tasks/scss.js';
import js from './tasks/js.js';
import img from './tasks/img.js';
import fonts from './tasks/fonts.js';

//Server
const server = ()=> {
    browserSync.init({
        server:{
            baseDir: path.root
        }
    });
}

//Наблюдение
const watcher = () =>{
    gulp.watch(path.pug.watch, pug).on('all', browserSync.reload);
    gulp.watch(path.scss.watch, scss).on('all', browserSync.reload);
    gulp.watch(path.js.watch, js).on('all', browserSync.reload);
    gulp.watch(path.img.watch, img).on('all', browserSync.reload);
    gulp.watch(path.fonts.watch, fonts).on('all', browserSync.reload);
}


const build = gulp.series(
        clear,
        gulp.parallel(pug,scss,js,img,fonts),
);
const dev = gulp.series(
    build,
    gulp.parallel(watcher,server)
);

/* Задачи */
export {pug};
export {scss};
export {js};
export {img};
export {fonts};

//Сборка
export default app.isProd
  ? build
  : dev ;