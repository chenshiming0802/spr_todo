package com.sprcore.fosun.app;


/**
 * 断言表
 * @author chensm
 *
 */
public class AppAsserts {
	/**
	 * 不能为Nulls
	 * @param obj
	 * @param message
	 */
	public static void notNull(Object obj,String message){
		if(obj==null){
			throw new AppException(message);
		}
	}
	/**
	 * 不能为Null或字符串空
	 * @param obj
	 * @param message
	 */
	public static void notNullOrEmpty(String obj,String message){
		if(obj==null || obj.trim().length()==0){
			throw new AppException(message);
		}
	}
	/**
	 * 是否相同
	 * @param o1
	 * @param o2
	 * @param message
	 */
	public static void equals(Object o1,Object o2,String message){
		if(o1!=null && o2==null){
			throw new AppException(message); 
		}
		if(o1==null && o2!=null){
			throw new AppException(message); 
		}
		if(!o1.equals(o2)){
			throw new AppException(message); 
		}
	}
}
