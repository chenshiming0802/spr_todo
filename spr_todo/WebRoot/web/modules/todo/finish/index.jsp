<%@ include  file="../../../inc/header.jsp"%>
<%
String todoLineId = req.getParameter("todoLineId",true);


Map map = null;
if(true){
	String sql = "select t1.* from td_user_todo_line t1 where t1.is_deleted='0' and t1.todo_line_id=? and t1.user_id=?";

	List param = new ArrayList();
	param.add(todoLineId);
	param.add(sessionUserId);
	map = dao.getRow(sql, param);	
}


//完成
Map map = new HashMap();
map.put("is_deleted","0");
map.put("todo_line_id",todoLineId);
map.put("user_id",sessionUserId);
map.put("finish_time",new Date());
dao.insert("td_user_todo_line",map);

out.println(Json.getString(map));

%>
<%@ include  file="../../../inc/footer.jsp"%>