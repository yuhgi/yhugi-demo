package com.racer.workerthread.threadpermessage;

import java.io.*;

public class Main{
	public static void main(String[] args) {
		Channel channel = new Channel();
		ClientThread t1 =  new ClientThread("Alice",channel);
		ClientThread t2 =  new ClientThread("Bobby",channel);
		ClientThread t3 =  new ClientThread("Chris",channel);

		t1.start();
		t2.start();
		t3.start();
		

		try{
			Thread.sleep(15000);

			t1.shutdownRequest();
			t2.shutdownRequest();
			t3.shutdownRequest();
			t1.join();
			t2.join();
			t3.join();
			
		}
		catch(InterruptedException e){
			e.printStackTrace();
		}
		FileWriter out = null;
		try{
			out = new FileWriter("counter.txt");
			out.write("Executes "+Request.getCounter()+" requests");
			out.close();
		}
		catch(IOException e){
			e.printStackTrace();
		}
		finally{
			
		}
	}
}