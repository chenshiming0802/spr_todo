<%@ include  file="../../../inc/header.jsp"%>
<%
String todoLineId = req.getParameter("todoLineId",true);


Map map = dao.getTableRow("td_user_todo_line",new AppMap().add("is_deleted","0")
														  .add("user_id",sessionUserId)
														  .add("todo_line_id",todoLineId));
if(map==null){
	map = new HashMap();
	map.put("is_deleted","0");
	map.put("todo_line_id",todoLineId);
	map.put("user_id",sessionUserId);
	map.put("finish_time",new Date());
	dao.insert("td_user_todo_line",map);	
}

out.println(Json.getString(null,map));

%>
<%@ include  file="../../../inc/footer.jsp"%>