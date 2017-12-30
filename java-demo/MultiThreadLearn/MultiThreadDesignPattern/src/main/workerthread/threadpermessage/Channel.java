package com.racer.workerthread.threadpermessage;


public class Channel{

	public void putRequest(final Request request){
		new Thread(){
			public void run(){
				request.execute();
			}
		}.start();
	}
}