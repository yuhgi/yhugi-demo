package com.racer.readwritelock;

public class Main{
	public static void main(String[] args) {
		Data data = new Data(10);
		new ReaderThread("ReaderThread-1",data).start();
		new ReaderThread("ReaderThread-2",data).start();
		new ReaderThread("ReaderThread-3",data).start();
		new ReaderThread("ReaderThread-4",data).start();
		new ReaderThread("ReaderThread-5",data).start();
		new ReaderThread("ReaderThread-6",data).start();

		new WriterThread("WriterThread-1",data,"ABCDEFGHIJKLMNOPQRSTUVWXYZ").start();
		new WriterThread("WriterThread-2",data,"abcdefghijklmnopqrstuvwxyz").start();
	}
}