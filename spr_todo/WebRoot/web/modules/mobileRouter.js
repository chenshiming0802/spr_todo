// Mobile Router
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
    "modules/todos/view",
    "modules/todo/view",
], function( $, Backbone, 
    todos,
    todo
    ) {
    "use strict";
    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            "": "view",
            ":viewName": "view",
            ":viewName/": "view",
            ":viewName/:param": "view"
        },
        _createView: function(viewName, param) {
            //var viewClass = viewName.substring(0, 1).toUpperCase() + viewName.substring(1, viewName.length) + "";
            var viewClass = viewName;
            var obj = {};
            //alert(viewClass);
            obj.__proto__ = eval(viewClass).prototype;

            eval(viewClass).call(obj, param);
            //viewCache[viewName] = obj;
            return obj;
        },  
        //deprecated @seeat view        
        index: function() {
            //alert('hi');
        },
        view: function(viewName, param) {
            console.log("viewName/param="+viewName+"/"+param);
            var params;
            if (param == null || param == '') {
                params = new Array();
            } else {
                params = param.split(",");
            }
            console.log("create view-#" + viewName);

            var obj = this._createView(viewName, {
                //el: "#" + viewName
                el:"#body"
            });   
            obj.viewName = viewName;
            obj.params = params;
            //$.mobile.changePage( "#"+viewName, { transition: "slide",reverse: false, changeHash: false } );
            var loadRet = obj.onCreate();
            //如果onLoad返回是非True则不执行onResume
            if(loadRet===true){
                obj.onResume();
                obj.onJs();
            }
            console.log("view onload finish-#" + viewName);            
        } 
    } );

    // Returns the Router class
    return CategoryRouter;

} );