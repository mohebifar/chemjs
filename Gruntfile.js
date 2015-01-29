var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
  '6to5': {
    options: {
      sourceMap: true,
      modules: 'ignore'
    },
    dist: {
      files:  [{
        expand: true,
        cwd: 'src',
        src: ['**/*.js', '!intro.js', '!outro.js'],
        dest: '.tmp/es5',
        ext: '.js'
      }]
    }
  },
  concat: {
    options: {
      sourceMap: true,
      separator: ''
    },
    dist: {
      src: [
        'src/intro.js',
        '.tmp/es5/**/*.js',
        'src/outro.js'
      ],
      dest: 'dist/chem.js'
    }
  },
  uglify: {
    options: {
      sourceMap: true
    },
    build: {
      files: {
        'dist/chem.min.js': ['dist/chem.js']
      }
    }
  },
  watch: {
    scripts: {
      files: ['src/**/*.js'],
      tasks: ['default'],
      options: {
        livereload: true,
        spawn: false
      }
    },
    examples: {
      files: ['examples/**/*'],
      options: {
        livereload: true,
        spawn: false
      }
    }
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc',
    },
    allFiles: [
      'src/**/*.js', '!src/intro.js', '!src/outro.js'
    ]
  },
  clean: {
    tmp: ['.tmp']
  }
});

grunt.registerTask('default', ['clean', '6to5', 'concat']);

grunt.registerTask('build', ['default', 'uglify']);