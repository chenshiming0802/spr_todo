var T = {
	//简化backbone的template写法
	tpl:function(jqObj,tpl,datas){
		var template = _.template(tpl);
		//console.log(template(datas));
		jqObj.html(template(datas));	
	},
	//tap事件注册，为解决backbone上的events注册tap无效问题
	tap:function(target,view,func){
       $(target).tap(function(e){
       		func(view,e);
       });  
	},
	//内部跳转，参照j2ee forward
	forword:function(viewName,params){
		//TODO params
		var paramstr = params;
        var url = "#"+viewName +"/"+ paramstr;
		console.log("forword:"+url);
        window.location=url;
	},
    //ajax
    getPageJson:function(ds,view,func,errFunc){
        var that = this;
        var viewName = view.viewName;
        var url = "modules/"+viewName+"/"+ds;
        /*$.getJSON(url, function(data){
          that._processHttpSr(view,data,func,errFunc);
        });*/  
        $.ajax({
          type: 'GET',
          url: url,
          dataType: 'json',
          success: function(data){
            that._processHttpSr(view,data,func,errFunc);
          },
          error: function(xhr, type){
            that._processHttpSr(view,{resultFlag:"1",resultMessage:"Net Error"},func,errFunc);
          }
        });         
    },
    //ajax
    postPage:function(ds,params,view,func,errFunc){
        var that = this;
        var viewName = view.viewName;
        var url = "modules/"+viewName+"/"+ds;
        console.log("post:"+url);
        console.log(params); 
        $.ajax({
          type: 'POST',
          url: url,
          data: params,
          dataType: 'json',
          success: function(data){
            that._processHttpSr(view,data,func,errFunc);
          },
          error: function(xhr, type){
            that._processHttpSr(view,{resultFlag:"1",resultMessage:"Net Error"},func,errFunc);
          }
        });
    },
    //for getPageJson&postPage 处理结果信息
    _processHttpSr:function(view,data,func,errFunc){
        console.log(data);
        if(data && data.resultFlag=="0"){
            if(func){
                func(view,data);
            }
        }else{
            alert('Net Error!!!');
            if(errFunc){
                errFunc(view,data);
            }
        }
    },
    //ajax ，封装zepto
    /*getJson:function(url,view,func){
        //TODO 错误处理 resultFlag=1
        console.log("getJson from:"+url);
        $.getJSON(url, function(data){
          console.log(data);
          func(view,data);
        });        
    },*/
    //搜索tagName对应的父节点
    getParent:function(jqObj,tagName){
        var jqTagName = jqObj.attr("tagName");
        //console.log(jqObj+"/"+jqTagName);
        if(jqTagName=="BODY" || jqTagName==undefined){
            return null;
        }
        if(jqTagName==tagName){
            return jqObj;
        }
        return this.getParent(jqObj.parent(),tagName);
    },
    repeatStr:function(count,str,sep){/*次数,字符串,间隔符*/
        var ret = "";
        for(var i=0;i<count;i++){
            ret += str;
        }
        return ret;
    },
    alert:function(message){
        window.alert(message);
    },	

    assertParamsLength:function(params,length){
        if(params.length<length){
            var errorMessage = "本页面参数错误，应该长度为:"+length;
            alert(errorMessage);
            throw new Error(0,errorMessage);
        }
    },
    assertNotNull:function (o,errorMessage){
        if(o==null||o==''){
            alert(errorMessage);
            throw new Error(0,errorMessage);
        }
    },

    /**
    json转string，通常用于打印日志用
    */
    json2str:function (o) {
        var arr = [];
        var currentT = this;
        var fmt = function(s) {
            if (typeof s == 'object' && s != null) return currentT.json2str(s);
            return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
        }
        for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
        return '{' + arr.join(',') + '}';
    },        
};

String.prototype.replaceAll = function (s1, s2) { 
    return this.replace(new RegExp(s1,"gm"),s2);
}
//window.T = T;