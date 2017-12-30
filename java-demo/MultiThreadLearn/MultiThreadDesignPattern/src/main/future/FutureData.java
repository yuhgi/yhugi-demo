package com.racer.future;

public class FutureData implements Data{
	private RealData realData = null;
	private boolean ready = false;

	public synchronized void setRealData(RealData realData){
		if(ready){
			return;
		}
		this.realData = realData;
		this.ready = true;
		notifyAll();
	}

	public synchronized String getContent(){
		while(!ready){
			try{
				wait();
			}catch(InterruptedException e){

			}
		}
		return realData.getContent();
	}
}