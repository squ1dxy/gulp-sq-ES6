import news from "../data/news.json";

const isProd = process.argv.includes("--production");
const isDev = !isProd

export default {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapsewhitespace: isProd
    },
    pug: {
        pretty: isDev, //<--- отвечает за сжатия если труе не сжимает 
        data: {
            news : news
        }
    },

    webpack: {
        mode : isProd ? "production" : "development" /* <-- переводит в вебпак а если "production" то минифицирует */
    },

    imagemin: {
        verbose: true /* будем видеть размер до и после */
    },

    fonter: {
        formats:["ttf","woff","eot","svg"]
    }
}