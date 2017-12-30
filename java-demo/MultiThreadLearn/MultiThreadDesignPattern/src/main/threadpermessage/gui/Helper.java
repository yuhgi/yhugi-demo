package com.racer.threadpermessage.gui;

public class Helper{
	public synchronized void handle(){
		System.out.println(Thread.currentThread().getName()+" start");
		for(int i=0;i<50;i++){
			System.out.print(".");
			try{
				Thread.sleep(100);
			}catch(InterruptedException e){
				e.printStackTrace();
			}
		}
		System.out.println(Thread.currentThread().getName()+" done");
	}
}