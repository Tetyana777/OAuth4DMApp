'use strict';

var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    server = require('gulp-express'),
    mongodbData = require('gulp-mongodb-data');

gulp.task('jshint', function() {
  return gulp.src(['app_src/**/*.js', 'app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(['app_src/**/*.js', 'app.js'], ['jshint']);
});


gulp.task('server', function () {
     server.run(['app.js']);
    //gulp.watch(['app.js', 'routes/**/*.js', 'app_src/**/*.js'], ['jshint']);
     gulp.watch(['app.js', 'routes/**/*.js', 'app_src/**/*.js'], [server.run]);
});

gulp.task('users', function() {
  gulp.src('db')
    .pipe(mongodbData({
      mongoUrl: 'mongodb://localhost:27017/db',
      idAsObjectID: false
    }))
});

gulp.task('lint', function () {
  gulp.src(['app_src/**/*.js', 'app.js'])
    .pipe(jshint())
});
 
gulp.task('develop', function () {
  var stream = nodemon({ script: 'app.js',
            ext: 'js',
            ignore: ['gulpfile.js'],
            tasks: ['jshint'] })
 
  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  
      })
});

gulp.task('default', ['jshint', 'watch', 'server', 'users', 'lint', 'develop']);


