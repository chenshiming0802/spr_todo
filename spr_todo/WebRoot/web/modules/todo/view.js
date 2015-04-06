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
            //"change .checkboxObj":"checkboxObj",
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
            T.tap("#ulObj",that,that.liObj);
        },
        renderTpl:function(view,data){
            var that = this,doc = document;
            T.tpl($("#ulObj"),tplUl,{"collection":data.datas});  
            $("#headerTitle").text(data.title);  
        },
        checkboxObj:function(e){
            var that = this;
            var checked = e.target.checked;
            var val = e.target.value;
            if(checked){
                T.postPage("finish/index.jsp",{todoLineId:val},that,null,function(){
                    e.target.checked = false;
                });
            }else{
                T.postPage("unfinish/index.jsp",{todoLineId:val},that,null,function(){
                    e.target.checked = true;
                });
            } 
        },  
        liObj:function(view,e){
            var that = view;
            var obj = T.getParent($(e.target),"LI");
            if(obj){
                var cbox = obj.find("input[type=checkbox]");
                var val = cbox.val();
   
                if(true == cbox.prop("checked")){
                    cbox.prop("checked",false); 
                    T.postPage("unfinish/index.jsp",{todoLineId:val},that,null,function(){
                        cbox.prop("checked",true); 
                    });
                }else{
                    cbox.prop("checked",true); 
                    T.postPage("finish/index.jsp",{todoLineId:val},that,null,function(){
                        cbox.prop("checked",false); 
                    });
                } 
                //console.log(cbox.val());
            }
        }      
    } );
    return View;

} );