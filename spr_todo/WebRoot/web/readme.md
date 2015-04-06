前台编码规范：
1. 不建议function嵌套function，比如oncreate中有function则，另外写function，并通过that.xxx调用
2. viewName为对象名，方法为动作
3. 事件都绑定在id上，比如li需要tap事件，则对ul定义id
4. 所有点击事件全部使用tap，禁用checkbox的change等事件

后台编码规范
1. restfull的方式对外 对象名/动作




常用编码：

--------------------------------------------------
Map map = null;
if(true){
	String sql = "select t1.* from td_todo t1 where t1.is_deleted='0' and t1.id=?";
	List param = new ArrayList();
	param.add(todoId);
	map = dao.getRow(sql, param);
}
--------------------------------------------------