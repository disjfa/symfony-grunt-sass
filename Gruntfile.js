module.exports = function (grunt) {
    // read in assets from configuration
    var assets = grunt.file.readJSON('app/config/assets.json');

    // prefix assets with 'web/'
    var loadAssets = function (config) {
        var ret = {};
        var dest = 'web/' + config.destination;
        var files = [];

        config.source.forEach(function (val) {
            files.push('web/' + val);
        });

        ret[dest] = files;

        return ret;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        modernizr: {
            dist: {
                devFile: "remote",
                outputFile: "web/_static/js/modernizr.js",
                files: {
                    "src": ["../app/Resource/js/*", "web/_dev/css/*"]
                }
            }
        },
        copy: {
            options: {

            },
            build: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'web/vendor/font-awesome/fonts/*',
                dest: 'web/fonts'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'web/js/*'
            ]
        },

        concat: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: loadAssets(assets.concat)
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: loadAssets(assets.uglify)
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: loadAssets(assets.scss)

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
                files: loadAssets(assets.css)
            }
        },

        clean: ['web/_static/*'],

        watch: {
            sass: {
                files: 'app/Resources/**/*.scss',
                tasks: ['sass'],
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
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'concat', 'sass', 'modernizr', 'watch']);
    grunt.registerTask('prod', ['clean', 'copy', 'jshint', 'concat', 'uglify', 'sass', 'cssmin', 'modernizr']);
};