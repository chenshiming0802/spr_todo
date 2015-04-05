package com.sprcore.fosun.app;


/**
 * 为简化系统内部异常处理，所有异常转为BaseException<BR>
 * 业务错误也可以转为AppException
 * @author chensm
 *
 */
public class AppException extends RuntimeException {
	public AppException(String message) {
		this.message = message;
	}

	public AppException(Exception e) {
		this.e = e;
		this.message = e.getMessage();
		e.printStackTrace();
	}

	public String message;
	public Exception e;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Exception getE() {
		return e;
	}

	public void setE(Exception e) {
		this.e = e;
	}

	@Override
	public void printStackTrace() {
		
	}
	
	

}

