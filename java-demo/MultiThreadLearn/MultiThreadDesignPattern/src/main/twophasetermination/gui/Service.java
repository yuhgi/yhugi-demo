package com.racer.twophasetermination.gui;


public class Service{
	private static PrintThread printThread = new PrintThread();
	public static void service(){
		//System.out.println("service");
		if(printThread.isAlive()){
			System.out.println("PrintThread is running, balking");
		}
		else{
			printThread = new PrintThread();
			printThread.start();
		}

	}

	public static void cancel(){
		System.out.println(Thread.currentThread().getName()+" call cancel");
		try{
			printThread.shutdownRequest();
			printThread.join();
		}
		catch(InterruptedException e){
			e.printStackTrace();
		}
		
	}
}
