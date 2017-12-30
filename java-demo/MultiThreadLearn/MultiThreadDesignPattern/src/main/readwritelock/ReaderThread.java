package com.racer.readwritelock;

public class ReaderThread extends Thread{
	private final Data data;
	public ReaderThread(String name,Data data){
		super(name);
		this.data = data;
	}

	public void run(){
		try{
			while(true){
				char[] readbuf = data.read();
				System.out.println(Thread.currentThread().getName()+" reads "+String.valueOf(readbuf));
			}
		}
		catch(InterruptedException e){

		}
	}
}