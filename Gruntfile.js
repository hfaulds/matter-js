module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildName: 'matter',
    buildVersion: '<%= pkg.version %>-edge',
    docVersion: 'v<%= pkg.version %>',
    browserify: {
      banner: '/**\n* <%= buildName %>.js <%= buildVersion %> <%= grunt.template.today("yyyy-mm-dd") %>\n* <%= pkg.homepage %>\n* License: <%= pkg.license %>\n*/\n\n',
      'build/<%= buildName %>.js': ['src/main.js']
    },
    uglify: {
      min: {
        options: {
          banner: '/**\n* <%= buildName %>.min.js <%= buildVersion %> <%= grunt.template.today("yyyy-mm-dd") %>\n* <%= pkg.homepage %>\n* License: <%= pkg.license %>\n*/\n\n'
        },
        src: 'build/<%= buildName %>.js',
        dest: 'build/<%= buildName %>.min.js'
      },
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: false,
          beautify: {
            width: 32000,
            indent_level: 2,
            space_colon: false,
            beautify: true
          },
          banner: '/**\n* <%= buildName %>.min.js <%= buildVersion %> <%= grunt.template.today("yyyy-mm-dd") %>\n* <%= pkg.homepage %>\n* License: <%= pkg.license %>\n*/\n\n'
        },
        src: 'build/<%= buildName %>.js',
        dest: 'build/<%= buildName %>.js'
      }
    },
    copy: {
      demo: {
          src: 'build/<%= buildName %>.js',
          dest: 'demo/js/lib/<%= buildName %>.js'
        }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['src/**/*.js', 'demo/js/*.js', '!src/module/*']
    },
    connect: {
      watch: {
        options: {
          port: 9000,
          open: 'http://localhost:9000/demo/dev.html',
          livereload: 9001
        }
      }
    },
    watch: {
      options: {
        livereload: {
          port: 9001
        }
      },
      src: {
        files: ['src/**/*.js'],
        tasks: ['build:dev']
      },
      demo: {
        files: ['build/matter.js', 'demo/js/**/*.html', 'demo/js/**/*.js', 'demo/css/**/*.css']
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>.js Physics Engine API Documentation for <%= docVersion %>',
        description: '<%= pkg.description %>',
        version: '<%= docVersion %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src',
          themedir: 'matter-doc-theme',
          outdir: 'doc',
          linkNatives: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.registerTask('default', ['test', 'build']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('dev', ['build:dev', 'connect:watch', 'watch']);

  grunt.registerTask('build', function(mode) {
    var isDev = (mode === 'dev'),
        isRelease = (mode === 'release'),
        isEdge = (mode === 'edge'),
        pkg = grunt.file.readJSON('package.json'),
        uglifyTask;

    // development build mode
    if (isDev) {
      grunt.config.set('buildName', 'matter-dev');
      grunt.config.set('buildVersion', pkg.version + '-dev');
      grunt.task.run('browserify', 'uglify:dev', 'uglify:min', 'copy');
    }

    // release build mode
    if (isRelease) {
      grunt.config.set('buildName', 'matter-' + pkg.version);
      grunt.config.set('buildVersion', pkg.version + '-alpha');
      grunt.task.run('browserify', 'uglify:min', 'copy');
    }

    // edge build mode (default)
    if (isEdge || (!isDev && !isRelease)) {
      grunt.config.set('buildVersion', pkg.version + '-edge');
      grunt.task.run('browserify', 'uglify:min');
    }
  });

  grunt.registerTask('doc', function(mode) {
    var isDev = (mode === 'dev'),
        isRelease = (mode === 'release'),
        isEdge = (mode === 'edge');

    if (isEdge)
      grunt.config.set('docVersion', 'edge version (master)');

    grunt.task.run('yuidoc');
  });

  grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
    grunt.config.set(name, val);
  });
};
