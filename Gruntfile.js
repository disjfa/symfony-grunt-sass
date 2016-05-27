module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        modernizr: {
            dist: {
                cache: true,
                devFile: "remote",
                dest: "web/demo/js/modernizr.js",
                files: {
                    "src": ["web/demo/js/*", "web/demo/css/*"]
                }
            }
        },
        copy: {
            options: {},
            build: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'node_modules/font-awesome/fonts/*',
                dest: 'web/demo/fonts'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                esversion: 6
            },
            all: [
                'Gruntfile.js',
                'web/demo/scripts/**/*.js'
            ]
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        [
                            'babelify',
                            {
                                presets: ['es2015']
                            }
                        ]
                    ],
                    browserifyOptions: {
                        debug: true
                    },
                    exclude: ''
                },
                files: {
                    'web/demo/js/demo.js': ['web/demo/scripts/demo.js']
                }
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'web/demo/js/demo.min.js': ['web/demo/js/demo.js']
                }
            }
        },
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: [
                'web/demo/sass/app.scss',
                'web/demo/sass/**/*.scss'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules'
                },
                files: {
                    'web/demo/css/demo.css': 'web/demo/sass/demo.scss'
                }
            }
        },

        cssmin: {
            options: {
                report: 'min',
                root: 'web',
                target: 'web',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'web/demo/css/demo.min.css': 'web/demo/css/demo.css'
                }
            }
        },

        clean: [
            'web/demo/css/*',
            'web/demo/fonts/*',
            'web/demo/js/*'
        ],

        watch: {
            sass: {
                files: 'web/demo/**/*.scss',
                tasks: ['sasslint', 'sass'],
                options: {
                    debounceDelay: 250
                }
            },
            scripts: {
                files: 'web/demo/scripts/**/*.js',
                tasks: ['jshint', 'browserify'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass-lint');

    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'browserify', 'sasslint', 'sass', 'modernizr']);
    grunt.registerTask('watcher', ['default', 'watch']);
    grunt.registerTask('prod', ['clean', 'copy', 'jshint', 'browserify', 'uglify', 'sasslint', 'sass', 'cssmin', 'modernizr']);
};