const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const bom = require('gulp-bom');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

function createGulpTasks({ serverDir, buildFolder, buildJsp }) {
  /**
   * html to jsp
   */
  gulp.task('toJSP', () => {
    if (!buildJsp) return Promise.resolve('done');
    const jspName = path.basename(buildJsp);
    const jspDir = path.dirname(buildJsp);
    return (
      gulp
        .src('build/index.html')
        .pipe(
          plumber({
            errorHandler(error) {
              console.log(error.message);
              this.emit('end');
            }
          })
        )
        // gulp bom is to conver files to utf-8
        .pipe(bom())
        .pipe(rename(jspName))
        .pipe(gulp.dest(`${serverDir}${jspDir}`))
    );
  });

  /**
   * clean build folder
   */
  gulp.task('cleanBuild', () =>
    gulp
      .src(`${serverDir}${buildFolder}`, {
        read: false,
        allowEmpty: true
      })
      .pipe(
        clean({
          force: true
        })
      )
  );

  /**
   * copy build to serverDir
   */
  gulp.task('copyBuild', () => {
    if (!buildJsp) {
      return gulp
        .src('build/**/*')
        .pipe(gulp.dest(`${serverDir}${buildFolder}`));
    }
    return gulp
      .src(['build/**/*', '!build/index.html'])
      .pipe(gulp.dest(`${serverDir}${buildFolder}`));
  });

  /**
   * production
   */
  gulp.task('production', gulp.series(['toJSP', 'cleanBuild', 'copyBuild']));
}

module.exports = createGulpTasks;
