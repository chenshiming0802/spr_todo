package com.sprcore.fosun.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.sprcore.fosun.app.AppAsserts;

public class Request {
	private Log logger = LogFactory.getLog(getClass()); 
	private HttpServletRequest request;
	
	public Request(HttpServletRequest request){
		this.request = request;
	}
	
	public String getParameter(String key,boolean isRequired){
		String value = request.getParameter(key);
		logger.info("req.getParamter:"+key+"="+value+" - "+isRequired);
		AppAsserts.notNullOrEmpty(value, key+" 必填");
		return value;
	}

}
