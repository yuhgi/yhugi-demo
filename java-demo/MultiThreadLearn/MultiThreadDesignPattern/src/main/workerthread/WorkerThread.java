package com.racer.workerthread;

public class WorkerThread extends Thread{
	private final Channel channel;

	private volatile boolean shutdownRequested = false;

	public WorkerThread(String name,Channel channel){
		super(name);
		this.channel = channel;
	}

	public void shutdownRequest(){
		shutdownRequested = true;
		interrupt();
	}


	public void run(){
		try{
			while(!shutdownRequested){
				doWork();
			}	
		}
		catch(InterruptedException e){

		}
		finally{
			doShutdown();
		}
	}


	public void doWork()throws InterruptedException{
		Request request = channel.takeRequest();
		request.execute();
	}


	public void doShutdown(){
		System.out.println(Thread.currentThread().getName()+" doShutdown....");
	}
}