module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            development: {
                files: [
                    'dist/mm-app/assets/css/less/*.less',
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
                    "dist/mm-app/assets/css/app-main.css": "dist/mm-app/assets/css/less/app-main.less"
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
                files: {
                    'dist/mm-app/assets/js/app-main.min.js': ['dist/mm-app/assets/js/app-main.js', 'dist/mm-app/assets/js/app-router.js'],
                    'dist/mm-app/assets/js/app-factories.min.js': ['dist/mm-app/assets/js/factories/DataFactory.js', 'dist/mm-app/assets/js/factories/FileUploadFactory.js'],
                    'dist/mm-app/assets/js/app-controllers.min.js': ['dist/mm-app/assets/js/controllers/MasterController.js', 'dist/mm-app/assets/js/controllers/ListingController.js', 'dist/mm-app/assets/js/controllers/SidebarController.js'],
                    'dist/mm-app/assets/js/app-directives.min.js': ['dist/mm-app/assets/js/directives/MainContentDirective.js', 'dist/mm-app/assets/js/directives/FileUploadDirectives.js']
                }
            }
        }




    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};