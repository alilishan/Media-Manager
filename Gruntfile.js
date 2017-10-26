module.exports = function(grunt) {


    var main_js_JQ = [
        'dist/mm-app/assets/libs/jquery-1.12.0.min.js', 
        'dist/mm-app/assets/libs/bootstrap-3.3.6/js/bootstrap.min.js', 
        'dist/mm-app/assets/libs/jquery-ui-1.11.4.custom.min.js'
    ]

    var main_js_NG = [
        'dist/mm-app/assets/libs/angular-1.5.0/angular.min.js', 
        'dist/mm-app/assets/libs/angular-1.5.0/angular-ui-router.min.js', 
        'dist/mm-app/assets/libs/angular-1.5.0/angular-animate.min.js'
    ]

    var main_js_PLUGINS = [
        'dist/mm-app/assets/libs/underscore-min.js',
        'dist/mm-app/assets/libs/ng-ui-tree/angular-ui-tree.min.js',
        'dist/mm-app/assets/libs/naturalSort.js',
        'dist/mm-app/assets/libs/ng-growl/angular-growl.min.js',
        'dist/mm-app/assets/libs/angular-1.5.0/angular-base64.min.js',
        'dist/mm-app/assets/libs/ng-contenxtmenu/contextMenu.js',
        'dist/mm-app/assets/libs/js-swal/sweetalert2.min.js'
    ]

    var main_css_PLUGINS = [
        'dist/mm-app/assets/libs/css-hint/hint.min.css',
        'dist/mm-app/assets/libs/ng-growl/angular-growl.min.css',
        'dist/mm-app/assets/libs/js-swal/sweetalert2.min.css',
        'dist/mm-app/assets/libs/ng-ui-tree/angular-ui-tree.min.css',
        'dist/mm-app/assets/libs/text-spinners-1.0.4/spinners.css'
    ]

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            development: {
                files: [
                    'dist/mm-app/assets/less/*.less',
                    'dist/mm-app/assets/js/**/*.js'
                ],
                tasks: ['less:development', 'autoprefixer:development', 'uglify:development'],
                options: {
                    event: ['changed', 'added', 'deleted'], //all
                    spawn: false
                }
            }
        },


        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2,
                    //sourceMap: true,
                    modifyVars: {
                        version: '<%= pkg.version %>'
                    },
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    "dist/mm-app/assets/css/app-main.css": "dist/mm-app/assets/less/app-main.less"
                }
            }
        },


        autoprefixer: {
            development: {
                src: 'dist/mm-app/assets/css/app-main.css',
                dest: 'dist/mm-app/assets/css/app-main.css'
            }
        },


        uglify: {
            development: {
                options: {
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'dist/mm-app/assets/js/app-main.min.js': ['dist/mm-app/assets/js/app-main.js', 'dist/mm-app/assets/js/app-router.js'],
                    'dist/mm-app/assets/js/app-factories.min.js': ['dist/mm-app/assets/js/factories/DataFactory.js', 'dist/mm-app/assets/js/factories/FileUploadFactory.js'],
                    'dist/mm-app/assets/js/app-controllers.min.js': ['dist/mm-app/assets/js/controllers/MasterController.js', 'dist/mm-app/assets/js/controllers/ListingController.js', 'dist/mm-app/assets/js/controllers/SidebarController.js'],
                    'dist/mm-app/assets/js/app-directives.min.js': ['dist/mm-app/assets/js/directives/MainContentDirective.js', 'dist/mm-app/assets/js/directives/FileUploadDirectives.js']
                }
            },
            libs: {
                options: {
                    sourceMap: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'dist/mm-app/assets/js/app-main-jquery.min.js': main_js_JQ,
                    'dist/mm-app/assets/js/app-main-angular.min.js': main_js_NG,
                    'dist/mm-app/assets/js/app-main-plugins.min.js': main_js_PLUGINS
                }
            }
        },


        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            libs: {
                files: {
                    'dist/mm-app/assets/css/app-main-plugins.min.css': main_css_PLUGINS
                }
            }
        }


    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('pack', ['uglify:libs', 'cssmin:libs']);

};