package com.racer.chainofresponsibility;

public abstract class Handler{
	protected Handler successor;
	public abstract void handleRequest();

	public void setSuccessor(Handler successor){
		this.successor = successor;
	}

	public Handler getSuccessor(){
		return this.successor;
	}
}