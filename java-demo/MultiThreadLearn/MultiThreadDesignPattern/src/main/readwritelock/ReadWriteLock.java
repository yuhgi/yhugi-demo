package com.racer.readwritelock;

public final class ReadWriteLock{
	private int readingReaders = 0;
	private int watingWriters = 0;
	private int writingWriters = 0;
	private boolean perferWriter = true;//Writer has high priority

	public synchronized void readLock() throws InterruptedException{
		while(writingWriters>0 || (perferWriter && watingWriters>0)){
			System.out.println(Thread.currentThread().getName()+" is waiting...");
			wait();
		}
		readingReaders++;
	}

	public synchronized void readUnlock(){
		readingReaders--;
		perferWriter = true;
		notifyAll();
	}

	public synchronized void writeLock() throws InterruptedException{
		watingWriters++;
		try{
			while(readingReaders>0 || writingWriters>0){
				System.out.println(Thread.currentThread().getName()+" is waiting...");
				wait();
			}
		}
		finally{
			watingWriters--;
		}
		writingWriters++;
	}

	public synchronized void writeUnlock(){
		writingWriters--;
		perferWriter = false;
		notifyAll();
	}
}