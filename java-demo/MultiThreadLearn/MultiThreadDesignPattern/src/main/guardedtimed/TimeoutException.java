package com.racer.guardedtimed;

public class TimeoutException extends InterruptedException{
	public TimeoutException(String msg){
		super(msg);
	}
}