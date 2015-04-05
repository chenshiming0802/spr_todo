// Sets the require.js configuration for your application.
require.config( {

	baseUrl: "lib",

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "zepto/zepto.min",
		"frozenjs": "frozenjs/1.0.1/frozen",
		"underscore": "requirejs/lodash.min",
		"backbone": "backbone/backbone-min",
		"text": 'requirejs/text2.0.12',
		"css": 'requirejs/css',
		"utils": 'utils',

		"modules": "../modules",
		
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		},
		"frozenjs": {
			"deps": [ "jquery" ],
			"exports": "fz"
		},
		"utils": {
			"deps": [ "jquery" ],
			"exports": "T"
		}		
	}

});

// Includes File Dependencies
require([
	"jquery",
	"frozenjs",
	"backbone",
	"utils",
	"modules/mobileRouter"
], function ( $, fz , Backbone, T ,Mobile ) {
	fz = frozen;
 

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); 
	this.router = new Mobile();
 
});
