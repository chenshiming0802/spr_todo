<%@page pageEncoding="UTF-8" contentType="text/json; charset=UTF-8" %> 
<%@ page import="java.util.*" %>
<%@ page import="com.sprcore.fosun.utils.*" %>
<%@ page import="com.sprcore.fosun.app.*" %>
<%

String sessionUserId = "1";//Session.getUserId(session)

Dao dao = new Dao();
try{	
	dao.beginTrancation();
%>	