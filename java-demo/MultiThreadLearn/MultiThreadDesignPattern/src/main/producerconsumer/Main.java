package com.racer.producerconsumer;

public class Main{
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		Table table = new Table(3);
		Thread thread1 = new MakerThread("MakerThread-1",table,31415);
		thread1.start();
		Thread thread2 = new MakerThread("MakerThread-2",table,92653);
		thread2.start();
		Thread thread3 = new MakerThread("MakerThread-3",table,58979);
		thread3.start();
		Thread thread4 = new EaterThread("EaterThread-1",table,32384);
		thread4.start();
		Thread thread5 = new EaterThread("EaterThread-2",table,62643);
		thread5.start();
		Thread thread6 = new EaterThread("EaterThread-3",table,38327);
		thread6.start();
		
		while(true){
			long now = System.currentTimeMillis();
			if(now - start>=10000){
				thread1.interrupt();
				thread2.interrupt();
				thread3.interrupt();
				thread4.interrupt();
				thread5.interrupt();
				thread6.interrupt();
				break;
			}
		}
	}
}