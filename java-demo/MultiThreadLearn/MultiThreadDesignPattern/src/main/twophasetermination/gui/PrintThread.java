package com.racer.twophasetermination.gui;

public class PrintThread extends Thread{
	private volatile boolean shutdownRequested = false;
	public void shutdownRequest(){
		shutdownRequested = true;
		interrupt();
	}

	public void run(){
		try{
			for(int i=0;i<50&&!shutdownRequested;i++){
				doWork();
			}
		}
		catch(InterruptedException e){

		}
		finally{
			doShutdown();
		}
	}

	private void doShutdown(){
		System.out.println(Thread.currentThread().getName()+" doShutdown");
	}

	private void doWork()throws InterruptedException{
		System.out.println(".");
		System.out.flush();
		Thread.sleep(100);
	}
}