<%@ include  file="../../../inc/header.jsp"%>
<%
String todoLineId = req.getParameter("todoLineId",true);

//完成
Map map = new HashMap();
map.put("is_deleted","1");
dao.update("td_user_todo_line",map,userTodoLineIds);	

out.println(Json.getString(map));

%>
<%@ include  file="../../../inc/footer.jsp"%>