// Category View
// =============
define([
	"jquery",
	"backbone",
    'text!modules/todos/tpl.html'
], function( $, Backbone,tpl) {
    "use strict";
    
    var View = Backbone.View.extend( {
        template: null,
        initialize: function() {
        },
        events: {
          //"click #tab1Ul":  "tab1Ul",
        },          
        onCreate:function(){
            var that = this;
            return true;
        },
        onResume:function(){

        },
        onJs:function(){
            var that = this;
        },
    } );
    return View;

} );