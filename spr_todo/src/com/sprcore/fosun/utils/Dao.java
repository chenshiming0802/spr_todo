package com.sprcore.fosun.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.sprcore.fosun.app.AppAsserts;
import com.sprcore.fosun.app.AppException;

public class Dao {
	private Log logger = LogFactory.getLog(getClass()); 
	private DataSource dataSource;
	private Connection conn;

	public void beginTrancation(){
		try {
			this.dataSource = (DataSource)Spring.getBean("dataSource");
			
			AppAsserts.notNull(dataSource, "dataSource is null");
			conn = dataSource.getConnection();
			conn.setAutoCommit(false);
		} catch (Exception e) {
			throw new AppException(e);
		}
	}

	public void endTrancation(boolean isCommit) {
		try {
			if (isCommit) {
				conn.commit();
			} else {
				conn.rollback();
			}
			if(conn!=null){
				conn.close();
			}
		} catch (Exception e) {
			throw new AppException(e);
		}
	}

	public Map queryById(String table ,String id) {
		String sql = "select t.* from "+table+" t where t.id=?";
		List param = new ArrayList();
		param.add(id);
		return getRow(sql, param);
	}

	public Map getRow(String sql,List param) {
		List<Map> list = queryList(sql, param);
		if(list!=null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	private Object getDbCell(Object obj){
		if (obj instanceof Timestamp) {
			Timestamp t = (Timestamp)obj;
			return new Date(t.getTime());
		}
		return obj;
	}

	public List<Map> queryList(String sql,List param) {
		List<Map> sr = new ArrayList<Map>();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			AppAsserts.notNull(conn, "Conn is null��please call beginTrancation");
			stmt = conn.prepareStatement(sql);

			printSql("queryList",sql,param);
			stmt = setPreparedStatement(stmt,param);
			rs = stmt.executeQuery();
			Map data = null;
			while (rs.next()) {
				data = new HashMap();
				ResultSetMetaData meta = rs.getMetaData();
				for(int i=0,j=meta.getColumnCount();i<j;i++){
					data.put(meta.getColumnName(i+1),getDbCell(rs.getObject(i+1)));
					logger.info(meta.getColumnName(i+1)+"/"+rs.getObject(i+1));
				}
				sr.add(data);
			}
		} catch (Exception e) {
			throw new AppException(e);
		}finally{
			try {
				if(rs!=null){
					rs.close();
				}
				if(stmt!=null){
					stmt.close();
				}
			} catch (Exception e2) {
				throw new AppException(e2);
			}
		}
		return sr;
	}
	
	private PreparedStatement setPreparedStatement(PreparedStatement stmt,List param) throws SQLException{
		//ע��Sql����
		for(int i=0,j=param.size();i<j;i++){
			Object item = param.get(i);
			if (item instanceof String) {
				stmt.setString(i+1, (String)item);
			}else if(item instanceof Integer) {
				stmt.setInt(i+1, ((Integer)item).intValue());
			}else if(item instanceof Float) {
				stmt.setFloat(i+1, ((Float)item).floatValue());
			}else{
				throw new AppException("DB��Ӧjava�����ͷǷ� "+item);
			}
		}
		return stmt;
	}

	public String insert(String table_name,Map map) {
		String uuid = UUID.randomUUID().toString();
		try {
			StringBuffer sb = new StringBuffer();
			StringBuffer sbValues = new StringBuffer();
			map.put("id",uuid);
			sb.append("insert into "+table_name+" t (");
			String sep = "";
			Connection conn = dataSource.getConnection();
			Iterator<String> it = map.keySet().iterator();
			List param = new ArrayList();
			while(it.hasNext()){
				String key = it.next();
				Object val = map.get(key);
				sb.append(sep).append(key);
				sbValues.append(sep).append("?");
				sep = ",";
				param.add(val);
			}
			sb.append(") values(");
			sb.append(sbValues).append(")");
			
			printSql("insert",sb.toString(),param);
			PreparedStatement stmt = conn.prepareStatement(sb.toString());
			stmt = setPreparedStatement(stmt, param);
			stmt.executeUpdate();
		} catch (Exception e) {
			throw new AppException(e);
		}
		return uuid;
	}

	public void update(String table_name,Map map, String id) {
		String uuid = UUID.randomUUID().toString();
		try {
			StringBuffer sb = new StringBuffer();
			StringBuffer sbValues = new StringBuffer();
			map.put("id",uuid);
			sb.append("update "+table_name+" set ");
			String sep = "";
			Connection conn = dataSource.getConnection();
			Iterator<String> it = map.keySet().iterator();
			List param = new ArrayList();
			while(it.hasNext()){
				String key = it.next();
				Object val = map.get(key);
				sb.append(sep).append(key);
				sb.append("=?");
				sep = ",";
				param.add(val);
			}
			sb.append(" where id=?");
			param.add(id);
			
			printSql("update",sb.toString(),param);
			PreparedStatement stmt = conn.prepareStatement(sb.toString());
			stmt = setPreparedStatement(stmt, param);
			stmt.executeUpdate();
		} catch (Exception e) {
			throw new AppException(e);
		}
 
	}

	public List<Map> queryOffsetList(String sql, int begin, int end) {
		//TODO
		return null;
	}
	
	private void printSql(String type,String sql,List param){
		StringBuffer sb = new StringBuffer("["+type+"]");
		sb.append(sql+"      [");
		for(int i=0,j=param.size();i<j;i++){
			sb.append(param.get(i)+",");
		}
		sb.append("]");
		logger.info(sb.toString());
	}

}
