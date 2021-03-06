module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-push-release');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


   compass: {

      development: {
        options: {
          config: 'config.rb',
          cssDir: 'css', // full fat
        } // options
      }, // development

      production: {
        options: {
          config: 'config_prod.rb',
          cssDir: 'css/dist', // minified
        } // options
      }, // production


    }, //compass





    jshint: {
      beforeconcat: ['js/*.js']
    }, // jshint

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'bower_components/bootstrap/js/*.js',
          'js/scripts.js'
        ],
        dest: 'js/dist/scripts.js',
      }
    },

    uglify: {
      build: {
        src: 'js/dist/scripts.js',
        dest: 'js/dist/scripts.min.js' // for some reason this places scripts.js before jquery
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },




    watch: {
      
      //options: {
      //  livereload: true,
      //}, //options

      jekyllSources: {
        files: [
          // capture all except css - add your own
          '*.html', '*.yml', 'assets/js/**.js',
          '_posts/**', '_includes/**', 'courses/**', 'css/**',
          ],
        tasks: 'shell:jekyll',
      },

      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['_site/**/*'],
      },

      // Add the following script to your HTML for livereload.
      // <script src="http://localhost:35729/livereload.js"></script>

      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass']
      }, // sass




      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,
        }
      }, // scripts

      css: {
        files: ['less/*.less'],
        tasks: ['less'],
      }, // css

      images: {
        files: ['images/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }, //images
    }, //watch

    shell: {
      jekyll: {
        command: 'rm -rf _site/*; jekyll build',
        stdout: true
      }
    }


  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin','compass', 'shell', 'watch']);

  grunt.registerTask('dev', ['connect', 'watch']);

};