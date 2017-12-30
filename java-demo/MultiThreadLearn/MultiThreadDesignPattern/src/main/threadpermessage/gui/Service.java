package com.racer.threadpermessage.gui;

public class Service{
	private final static Helper helper = new Helper();
	public static void service(){
		//System.out.println("service");
		new Thread(){
			public void run(){
				helper.handle();
			}
		}.start();
		
	}
}
