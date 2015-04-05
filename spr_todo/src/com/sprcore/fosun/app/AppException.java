package com.sprcore.fosun.app;


/**
 * Ϊ��ϵͳ�ڲ��쳣���������쳣תΪBaseException<BR>
 * ҵ�����Ҳ����תΪAppException
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

