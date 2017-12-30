package com.racer.balking;

import java.io.IOException;
import java.util.Random;

public class ChangerThread extends Thread{
	private Data data;
	private Random random = new Random();

	public ChangerThread(String name, Data data){
		super(name);
		this.data=data;
	}

	public void run(){
		try{
			for(int i=0;true;i++){
				data.change("NO."+i);
				Thread.sleep(random.nextInt(1000));
				data.save();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}