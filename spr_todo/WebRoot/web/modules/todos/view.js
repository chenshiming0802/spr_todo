// Category View
// =============
define([
	"jquery",
	"backbone",
    'text!modules/todos/tpl.html',
    'text!modules/todos/tpl_tab1ul.html'
], function( $, Backbone, 
	tpl,
	tab1ulTpl) {
    "use strict";
    
    var View = Backbone.View.extend( {
        template: null,
        initialize: function() {
        },
        events: {
        },          
        onCreate:function(){
            var that = this;
            T.tpl(that.$el,tpl,null);
            return true;
        },
        onResume:function(){
            var that = this;
            //T.getJSON("todo/query",that,that.renderTab1Ul);
            T.getPageJson(that,that.renderTab1Ul);
        },
        onJs:function(){
            var that = this;
            var tab = new fz.Scroll('.ui-tab', {
                role: 'tab',
                interval: 3000
            });
            tab.on('beforeScrollStart', function(fromIndex, toIndex) {
                console.log(fromIndex, toIndex);
            });
            T.tap("#tab1Ul",that,that.tab1Ul);
        },
        renderTab1Ul:function(view,data){
        	var that = view;
            T.tpl($("#tab1Ul"),tab1ulTpl,{"collection":data.datas});	      	
        },
        tab1Ul:function(view,e){
            var that = view;
            var obj = T.getParent($(e.target),"LI");
            if(obj){
                var sid = obj.attr("sid");
                T.forword("todo",[sid]);                
            }
        }
    } );
    return View;

} );