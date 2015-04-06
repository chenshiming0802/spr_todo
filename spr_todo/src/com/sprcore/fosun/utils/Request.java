package com.sprcore.fosun.utils;

import javax.servlet.http.HttpServletRequest;

import com.sprcore.fosun.app.AppAsserts;

public class Request {

	private HttpServletRequest request;
	
	public Request(HttpServletRequest request){
		this.request = request;
	}
	
	public String getParameter(String key,boolean isRequired){
		String value = request.getParameter(key);
		AppAsserts.notNullOrEmpty(value, key+" 必填");
		return value;
	}

}
