module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-symlink');
	
	grunt.initConfig({
		ts: {
			dist: {
				tsconfig: true
			}
		},
		mkdir: {
			dist: {
				options: {
					create: ['dist/node_modules']
				}
			}
		},
		symlink: {
			dist: {
				src: 'dist/load-generator',
				dest: 'dist/node_modules/load-generator'
			}
		},
		clean: {
			dist: ['dist']
		},
	});
	
	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', [
		'clean:dist',
		'mkdir:dist',
		'ts:dist'
	]);

};