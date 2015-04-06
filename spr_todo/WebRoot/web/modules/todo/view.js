// Category View
// =============
define([
	"jquery",
	"backbone",
    'text!modules/todo/tpl.html',
    'text!modules/todo/tpl_t.html'
], function( $, Backbone,tpl,tplUl) {
    "use strict";
    
    var View = Backbone.View.extend( {
        template: null,
        initialize: function() {
        },
        events: {
            "change .checkboxObj":"checkboxObj",
        },          
        onCreate:function(){
            var that = this;
            T.tpl(that.$el,tpl,null);
            return true;
        },
        onResume:function(){
            var that = this;
            T.assertParamsLength(that.params,1);
            var todoId = that.params[0];
            T.getPageJson("index?todoId="+todoId,that,that.renderTpl);

        },
        onJs:function(){
            var that = this;
        },
        renderTpl:function(view,data){
            var that = this,doc = document;
            T.tpl($("#ul"),tplUl,{"collection":data.datas});  
            $("#headerTitle").text(data.title);  
        },
        checkboxObj:function(e){
            var that = this;
            var checked = e.target.checked;
            var val = e.target.value;
            if(checked){
                T.postPage("finish",{todoLineId:val},that,that.n);
                alert("'selected="+val);
            }else{
                T.postPage("unfinish",{todoLineId:val},that,that.n);
                alert('unselected='+val);
            } 
        },
        n:function(view,data){
            var that = this,doc = document;
        }
        
    } );
    return View;

} );