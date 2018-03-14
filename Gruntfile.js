// vmn grunt sass toolkit
// includes sass, postcss and minifier
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // sass
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'scss',
          // src: ['**/*.scss'], // compiel all scss files
          src: ['*.scss'], // compile files only in root folder
          dest: 'www/css',
          ext: '.css'
        }]
      }
    },
    // post css
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: ['www/css/style.css']
      }
    },
    // css minify
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['*.css', '!*.min.css'],
          dest: 'www/css',
          ext: '.min.css'
        }]
      }
    },
    // js uglify
    // uglify: {
    //   options: {
    //     beautify: true,
    //     sourceMap: false
    //   },
    //   concat: {
    //     src: ['src/**/*.js'],
    //     dest: 'www/js/min.js'
    //   },
    //   each: {
    //     files: [{
    //       cwd: 'src/',
    //       src: '**/*.js',
    //       dest: 'www/js/',
    //       ext: '.min.js',
    //       expand: true,
    //       flatten: true
    //     }]
    //   }
    // },
    // watch for changes
    watch: {
      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin']
      },
      dev: {
        files: 'scss/**/*.{scss,sass}',
        tasks: ['sass', 'postcss']
      }
    }
  });
  
  // load grunt plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // register grunt tasks
  grunt.registerTask('default', ['watch:css']);
  grunt.registerTask('watchCSS', ['watch:css']);
  grunt.registerTask('brewCSS', ['sass', 'postcss', 'cssmin']);
  grunt.registerTask('brewCSSAndWatch', ['sass', 'postcss', 'cssmin', 'watch:css']);
};