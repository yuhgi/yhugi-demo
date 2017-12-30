package com.racer.workerthread.threadpermessage;

import java.util.Random;

public class Request{
	private final String name;
	private final int number;

	private static volatile long counter = 0;
	private static final Random random = new Random();

	public Request(String name,int number){
		this.name = name;
		this.number = number;
	}

	public static long getCounter(){
		return counter;
	}
	public void execute(){
		System.out.println(Thread.currentThread().getName()+" executes "+this);
		counter++;
		/*try{
			Thread.sleep(random.nextInt(1000));
		}
		catch(InterruptedException e){
			e.printStackTrace();
		}*/
	}

	public String toString(){
		return "[ Request from "+name+", NO."+number+"]";
	}
}