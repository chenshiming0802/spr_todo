<%@ include file="../../../inc/header.jsp"%>
<%
List list = dao.iQueryList("todos_index",new AppMap().add("user_id",sessionUserId));
out.println(Json.getString(list,null));
%>
<%@ include file="../../../inc/footer.jsp"%>