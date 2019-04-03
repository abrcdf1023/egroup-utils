function createGulpTasks({
  serverDir,
  buildJsp,
  buildFolder
}) {
  const path = require('path')
  const gulp = require('gulp');
  const plumber = require('gulp-plumber');
  const bom = require('gulp-bom');
  const rename = require('gulp-rename');
  const clean = require('gulp-clean');

  const jspName = path.basename(buildJsp)
  const jspDir = path.dirname(buildJsp)

  /**
   * html to jsp
   * We don't need to clean jsp here because it'll clean at landing page build process.
   * Therefore we need run build landing page first.
   */
  gulp.task('toJSP', () =>
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
   * copy build to backend
   */
  gulp.task('copyBuild', () =>
    gulp
      .src(['build/**/*', '!build/index.html'])
      .pipe(gulp.dest(`${serverDir}${buildFolder}`))
  );

  /**
   * production
   */
  gulp.task('production', gulp.series(['toJSP', 'cleanBuild', 'copyBuild']));

}

module.exports = createGulpTasks