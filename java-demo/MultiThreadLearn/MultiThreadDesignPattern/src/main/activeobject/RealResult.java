package com.racer.activeobject;

public class RealResult extends Result{
	private final Object resultValue;
	public RealResult(Object resultValue){
		this.resultValue = resultValue;
	}
	public Object getResultValue(){
		return resultValue;
	}
}