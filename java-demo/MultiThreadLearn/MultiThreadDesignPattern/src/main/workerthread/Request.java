package com.racer.workerthread;

import java.util.Random;

public class Request{
	private final String name;
	private final int number;

	private static final Random random = new Random();

	public Request(String name,int number){
		this.name = name;
		this.number = number;
	}

	public void execute(){
		System.out.println(Thread.currentThread().getName()+" executes "+this);
	}

	public String toString(){
		return "[ Request from "+name+", NO."+number+"]";
	}
}