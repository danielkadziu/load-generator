module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-parallelize');
	
	grunt.initConfig({
		ts: {
			dist: {
				tsconfig: true
			}
		},
		tslint: {
			options: {
				configuration: grunt.file.readJSON('tslint.json')
			},
			all: {
				src: ['*.ts']
			}
		},
		mkdir: {
			dist: {
				options: {
					create: ['dist/node_modules']
				}
			}
		},
		mochaTest: {
			options: {
				reporter: 'dot'
			},
			test: {
				src: ['dist/test/**/*.spec.js']
			}
		},
		parallelize: {
			tslint: {
				all: 4
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
		'parallelize:tslint:all',
		'ts:dist'
	]);
	
	grunt.registerTask('test', [
		'build',
		'mochaTest:test'
	]);

};