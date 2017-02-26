var gulp = require('gulp');
var sass = require("gulp-sass");

gulp.task("default", function() {
  gulp.watch(["**/*.scss"], ["sass"]);
});

gulp.task("sass", function() {
  gulp.src("*.scss")
    .pipe(sass())
    .pipe(gulp.dest(""));
});