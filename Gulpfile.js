"use strict";

var gulp       = require("gulp"),
    rename     = require("gulp-rename"),
    rimraf     = require("gulp-rimraf"),
    uglify     = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps");


gulp.task("clear", function () {
    return gulp
        .src(["./dist"], {read: false})
        .pipe(rimraf({force: true}));
});


gulp.task("build", ["clear"], function () {

    return gulp
        .src(["./src/**/**.js"])

        .pipe(gulp.dest("./dist"))

        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"));

});


gulp.task("default", ["clear", "build"]);
