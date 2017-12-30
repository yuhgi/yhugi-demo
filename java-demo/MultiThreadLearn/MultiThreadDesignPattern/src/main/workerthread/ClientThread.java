package com.racer.workerthread;

import java.util.Random;

public class ClientThread extends Thread{
	private final Channel channel;
	private static final Random random = new Random();
	private volatile boolean shutdownRequested = false;
	public ClientThread(String name,Channel channel){
		super(name);
		this.channel = channel;
	}

	public void shutdownRequest(){
		shutdownRequested = true;
		interrupt();
	}

	public void run(){
		try{
			for(int i=0;!shutdownRequested;i++){
				doWork(i);
			}
		}
		catch(InterruptedException e){
			e.printStackTrace();
		}
		finally{
			doShutdown();
		}
	}

	private void doWork(int i) throws InterruptedException{
		Request request = new Request(getName(),i);
		channel.putRequest(request);
		//Thread.sleep(random.nextInt(1000));
	}

	private void doShutdown(){
		System.out.println(Thread.currentThread().getName()+" doShutdown...");
	}
}