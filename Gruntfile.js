module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            development: {
                files: [
                    'mm-app/assets/css/less/*.less',
                    'mm-app/assets/js/*.js'
                ],
                tasks: ['less:development', 'autoprefixer:development'],
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
                    "mm-app/assets/css/app-main.css": "mm-app/assets/css/less/app-main.less"
                }
            }
        },

        autoprefixer: {
            development: {
                src: 'mm-app/assets/css/app-main.css',
                dest: 'mm-app/assets/css/app-main.css'
            }
        }


    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};