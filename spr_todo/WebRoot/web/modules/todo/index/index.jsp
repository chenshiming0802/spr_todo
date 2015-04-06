<%@ include file="../../../inc/header.jsp"%>
<%
String todoId = req.getParameter("todoId",true);
List<Map> list = dao.iQueryList("todo_index", new AppMap().add("user_id",sessionUserId).add("todo_id", "todoId"));
Map map = dao.getTableRowById("td_todo",todoId);
out.println(Json.getString(list,map));
%>
<%@ include file="../../../inc/footer.jsp"%>