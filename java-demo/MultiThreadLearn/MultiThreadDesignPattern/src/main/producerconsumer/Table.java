package com.racer.producerconsumer;

public class Table{
	private final String[] buffer;
	private int tail;
	private int head;
	private int count;

	public Table(int count){
		this.buffer = new String[count];
		this.head = 0;
		this.tail = 0;
		this.count = 0;
	}

	public synchronized void put(String cake)throws InterruptedException{
		
		while(count >= buffer.length){
			System.out.println(Thread.currentThread().getName()+" wait...");
			wait();
		}

		buffer[tail]=cake;
		System.out.println(Thread.currentThread().getName() + " puts "+cake);
		tail = (tail+1)%buffer.length;
		count++;
		notifyAll();
	}

	public synchronized String take() throws InterruptedException{
		while(count<=0){
			System.out.println(Thread.currentThread().getName()+" wait...");
			wait();
		}
		String cake = buffer[head];
		head = (head+1)%buffer.length;
		count--;
		notifyAll();
		System.out.println(Thread.currentThread().getName()+" takes "+cake);
		return cake;
	}

	public synchronized void clear(){
		tail = 0;
		head = 0;
		count = 0;
		notifyAll();
	}
}