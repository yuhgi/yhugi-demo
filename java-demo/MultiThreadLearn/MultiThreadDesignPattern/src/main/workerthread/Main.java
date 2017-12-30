package com.racer.workerthread;

import java.io.*;

public class Main{
	public static void main(String[] args) {
		Channel channel = new Channel(5);
		ClientThread[] threads = new ClientThread[3];

		for(int i=0;i<threads.length;i++){
			threads[i] = new ClientThread("ClientThread"+i,channel);
			threads[i].start();
		}

		channel.startWorkers();
		try{
			Thread.sleep(15000);
			for(int i=0;i<threads.length;i++){
				threads[i].shutdownRequest();
		}
		}
		catch(InterruptedException e){
			//e.printStackTrace();
		}
		finally{
			channel.stopWorkers();
		}
		System.exit(0);
	}
}