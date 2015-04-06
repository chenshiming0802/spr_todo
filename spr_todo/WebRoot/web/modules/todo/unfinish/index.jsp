<%@ include  file="../../../inc/header.jsp"%>
<%
String todoLineId = req.getParameter("todoLineId",true);

Map row = dao.getTableRow("td_user_todo_line",new AppMap().add("is_deleted","0")
														  .add("user_id",sessionUserId)
														  .add("todo_line_id",todoLineId));
if(row!=null){
	Map map = new HashMap();
	map.put("is_deleted","1");
	dao.update("td_user_todo_line",map,(String)row.get("id"));	

	out.println(Json.getString(null,map));	
}else{
	out.println(Json.getString(null,null));	
}


%>
<%@ include  file="../../../inc/footer.jsp"%>