package com.sprcore.fosun.utils;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.sprcore.fosun.utils.depend.DateJsonValueProcessor;

public class Json {
	public static String getString(List<Map> list,Map map){
		if(map==null){
			map = new HashMap();
		}
		if(!map.containsKey("resultFlag")){			
			map.put("resultFlag", "0");
		}
		map.put("datas", list);		
		return getString(map);
	}
	
	private static JsonConfig getJsonConfig(String format) {
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(java.util.Date.class,
				new DateJsonValueProcessor(format));
		config.registerJsonValueProcessor(Timestamp.class,
				new DateJsonValueProcessor(format));
		return config;
	}

	private static String getString(Map map) {
		return getString(map, "yyyy-MM-dd");
	}

	private static String getString(Map map, String format) {
		JSONObject jsonObject = JSONObject.fromObject(map,
				getJsonConfig(format));
		return jsonObject.toString();
	}
 

	
  

	public static String getString(Exception e) {
		Map map = new HashMap();
		map.put("resultFlag", "1");
		map.put("resultMessage", e.getClass().toString() + ":" + e.getMessage());
		map.put("datas", e.getMessage());
		return getString(map);
	}

}
