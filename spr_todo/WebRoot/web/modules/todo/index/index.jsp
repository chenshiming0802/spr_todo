<%@ include  file="../../../inc/header.jsp"%>
<%
String todoId = request.getParameter("todoId");
List<Map> list = null;
if(true){
	String sql = "SELECT t1.id id,t1.title title , t2.finish_time finish_time"+
				" 	FROM td_todo_line t1"+
				"  	LEFT JOIN td_user_todo_line t2"+
				"    ON t1.id = t2.todo_line_id"+
				"      AND t2.is_deleted = '0'"+
				"      AND t2.user_id = ?"+
				"	WHERE t1.is_deleted = '0' AND t1.todo_id = ? ";

	List param = new ArrayList();
	//param.add(Session.getUserId(session));
	param.add(sessionUserId);
	param.add(todoId);
	list = dao.queryList(sql, param);	
}

Map map = null;
if(true){
	String sql = "select t1.* from td_todo t1 where t1.is_deleted='0' and t1.id=?";

	List param = new ArrayList();
	param.add("1");
	map = dao.getRow(sql, param);	
}
out.println(Json.getString(list,map));
%>
<%@ include  file="../../../inc/footer.jsp"%>