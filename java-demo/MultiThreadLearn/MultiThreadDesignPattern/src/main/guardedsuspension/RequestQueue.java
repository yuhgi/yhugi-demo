package com.racer.guardedsuspension;

import java.util.LinkedList;

public class RequestQueue{
	private final LinkedList<Request> queue = new LinkedList<Request>();

	public synchronized Request getRequest(){
		long start = System.currentTimeMillis();
		while(queue.size()<=0){
			long now = System.currentTimeMillis();
			long rest = (30000)-(now - start);
			if(rest<=0){
				throw new LivenessException("now - start = "+(now - start)+", timeout = "+30000);
			}
				
			try{
				System.out.println(Thread.currentThread().getName()+" wait "+rest+"milliseconds.");
				wait(rest);
			}
			catch(InterruptedException e){

			}
		}
		return queue.removeFirst();
	}

	public synchronized void putRequest(Request request){
		queue.addLast(request);
		System.out.println("Notify all thread...");
		notifyAll();
	}
}