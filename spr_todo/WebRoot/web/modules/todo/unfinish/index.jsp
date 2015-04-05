<%@page pageEncoding="UTF-8" contentType="text/json; charset=UTF-8" %> 
<%@ page import="java.util.*" %>
<%@ page import="com.sprcore.fosun.utils.*" %>
<%@ page import="com.sprcore.fosun.app.*" %>
<%
/*
http://127.0.0.1:8080/spr_todo/servlet/todo/query
*/
Dao dao = new Dao();
try{	
	dao.beginTrancation();

	String checked = request.getParameter("checked");
	String todoLineId = request.getParameter("todoLineId");
	String userTodoLineId = request.getParameter("userTodoLineId");

	String sql = null;
	if(checked.equals("true")){
		//完成
		Map map = new HashMap();
		map.put("is_deleted","0");
		map.put("todo_id","1");
		map.put("todo_line_id","1");
		map.put("user_id","1");
		map.put("finish_time",new Date());
		dao.insert("td_user_todo_line",map);
	}else{
		//撤销
		Map map = new HashMap();
		map.put("is_deleted","1");
		dao.update("td_user_todo_line",map,userTodoLineIds);		
	}
	
	dao.endTrancation(true);

	out.println(Json.getString(map));
}catch(Exception e){
	e.printStackTrace();
	dao.endTrancation(false);
	out.println(Json.getString(e));
}
%>