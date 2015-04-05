<%@ include  file="../../../inc/header.jsp"%>
<%
List<Map> list = null;
if(true){
	String sql = "select t1.id,t1.title,t1.occure_date," +
		"(SELECT COUNT(*) FROM td_user_todo_line a1 WHERE a1.is_deleted='0' AND a1.user_id=t3.id AND a1.todo_id=t1.id) finish_count," +
		"(SELECT COUNT(*) FROM td_todo_line a2 WHERE a2.is_deleted='0' AND a2.todo_id=t1.id) all_count" +
		" from td_todo t1,td_user_todo t2,td_user t3 " +
		" where t1.id=t2.todo_id and t2.user_id=t3.id " +
		" and t1.is_deleted='0' and t2.is_deleted='0' and t3.is_deleted='0'" +
		" and t3.id=?";
	List param = new ArrayList();
	param.add(sessionUserId);
	list = dao.queryList(sql, param);	
}
out.println(Json.getString(list,null));
%>
<%@ include  file="../../../inc/footer.jsp"%>