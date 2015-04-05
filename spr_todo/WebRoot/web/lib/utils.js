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
    //ajax 获取当前页面的json数据
    getPageJson:function(ds,view,func){
        var viewName = view.viewName;
        var url = "modules/"+viewName+"/"+ds;
        return this.getJson(url,view,func);
    },
    //ajax ，封装zepto
    getJson:function(url,view,func){
        //TODO 错误处理 resultFlag=1
        $.getJSON(url, function(data){
          console.log(data);
          func(view,data);
        });        
    },
    //搜索tagName对应的父节点
    getParent:function(jqObj,tagName){
        var jqTagName = jqObj.attr("tagName");
        console.log(jqObj+"/"+jqTagName);
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