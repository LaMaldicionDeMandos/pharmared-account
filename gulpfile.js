var gulp = require('gulp-npm-run')(require('gulp'), {
    require: ['tests']
});
gulp.task('staging', function(){});
gulp.task('production', function(){});
gulp.task('test', ['tests']);
